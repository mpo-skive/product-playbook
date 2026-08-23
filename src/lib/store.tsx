import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Craft, PersonaId, SectionId } from "@/content/meta";

interface Store {
  persona: PersonaId | null;
  craft: Craft | null;
  setPersona: (p: PersonaId | null) => void;
  setCraft: (c: Craft | null) => void;
  visited: Set<SectionId>;
  markVisited: (id: SectionId) => void;
  resetProgress: () => void;
}

const Ctx = createContext<Store | null>(null);
const P_KEY = "dpp.persona";
const C_KEY = "dpp.craft";
const V_KEY = "dpp.visited";

function read<T>(key: string, parse: (raw: string) => T, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** Sections marked read in storage, whichever tab put them there. */
function storedVisited(): Set<SectionId> {
  return read(
    V_KEY,
    (raw) => {
      const parsed = JSON.parse(raw);
      return new Set(Array.isArray(parsed) ? (parsed as SectionId[]) : []);
    },
    new Set<SectionId>(),
  );
}

export function StoreProvider({ children }: { children: ReactNode }) {
  // Hydrated during the first render, not in an effect. Child effects run
  // before the parent's, so App would call markVisited against an empty set
  // and write that back, wiping every tick saved in an earlier session.
  const [persona, setPersonaState] = useState<PersonaId | null>(() =>
    read(P_KEY, (raw) => raw as PersonaId, null as PersonaId | null),
  );
  const [craft, setCraftState] = useState<Craft | null>(() =>
    read(C_KEY, (raw) => raw as Craft, null as Craft | null),
  );
  const [visited, setVisited] = useState<Set<SectionId>>(storedVisited);

  const setPersona = useCallback((p: PersonaId | null) => {
    setPersonaState(p);
    try {
      if (p) localStorage.setItem(P_KEY, p);
      else localStorage.removeItem(P_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const setCraft = useCallback((c: Craft | null) => {
    setCraftState(c);
    try {
      if (c) localStorage.setItem(C_KEY, c);
      else localStorage.removeItem(C_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const markVisited = useCallback((id: SectionId) => {
    setVisited((prev) => {
      // Merge with storage rather than overwriting it, so a second tab reading
      // in parallel cannot drop the other's ticks.
      const next = new Set([...storedVisited(), ...prev, id]);
      if (next.size === prev.size) return prev;
      try {
        localStorage.setItem(V_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setVisited(new Set());
    try {
      localStorage.removeItem(V_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ persona, craft, setPersona, setCraft, visited, markVisited, resetProgress }),
    [persona, craft, setPersona, setCraft, visited, markVisited, resetProgress],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
