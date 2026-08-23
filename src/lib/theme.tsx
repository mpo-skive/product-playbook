import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from "react";

type Mode = "light" | "dark";
type ThemeCtx = { mode: Mode; toggle: () => void; setMode: (m: Mode) => void };

const Ctx = createContext<ThemeCtx | null>(null);
const STORAGE_KEY = "dpp.mode";

function readInitial(): Mode {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-mode");
    if (attr === "dark" || attr === "light") return attr;
  }
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(readInitial);

  const apply = useCallback((m: Mode) => {
    const root = document.documentElement;
    root.setAttribute("data-zone", "enterprise");
    root.setAttribute("data-mode", m);
    root.style.colorScheme = m;
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    apply(mode);
  }, [mode, apply]);

  const setMode = useCallback((m: Mode) => setModeState(m), []);
  const toggle = useCallback(() => setModeState((m) => (m === "dark" ? "light" : "dark")), []);

  return <Ctx.Provider value={{ mode, toggle, setMode }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
