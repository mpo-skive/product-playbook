import { useCallback, useEffect, useRef, useState } from "react";
import type { SectionId } from "@/content/meta";

const VALID: SectionId[] = [
  "home",
  "why",
  "principles",
  "problems",
  "team",
  "test",
  "modernise",
  "govern",
  "tools",
  "start",
  "glossary",
];

function parse(): SectionId {
  const raw = window.location.hash.replace(/^#\/?/, "").split("?")[0] as SectionId;
  return VALID.includes(raw) ? raw : "home";
}

export function useHashRoute(): [SectionId, (id: SectionId) => void] {
  const [route, setRoute] = useState<SectionId>(parse);
  const routeRef = useRef(route);
  routeRef.current = route;

  useEffect(() => {
    const sync = () => setRoute(parse());
    // Re-read on mount: a hash change between first render and this listener
    // attaching would otherwise be lost, leaving the URL and the view out of step.
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const navigate = useCallback((id: SectionId) => {
    const alreadyHere = routeRef.current === id && parse() === id;
    // Setting an identical hash fires no event, so the view is updated directly
    // rather than waiting on hashchange.
    if (window.location.hash !== `#/${id}`) window.location.hash = `/${id}`;
    setRoute(id);
    // Navigating to a different section restores that section's remembered
    // offset (see useScrollMemory). Re-picking the current section is a
    // deliberate "back to top".
    if (alreadyHere) window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return [route, navigate];
}
