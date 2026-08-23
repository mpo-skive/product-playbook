import { useEffect, useRef } from "react";
import type { SectionId } from "@/content/meta";

/* Remembers where the reader stopped in each section, so returning to a
 * section resumes there instead of jumping back to the top. Persisted in
 * localStorage alongside the profile and progress, so it survives a reload.
 *
 * Two things make a naive restore land in the wrong place, and both are
 * handled below. The stylesheet sets scroll-behavior: smooth, which turns a
 * programmatic restore into an animation whose intermediate offsets must not be
 * recorded; and sections built from tabs, disclosures and widgets animate
 * height 0 -> auto on mount, so the page is briefly too short to reach a deep
 * offset and the browser clamps it. So the restore jumps instantly, keeps
 * chasing the offset while the page is still growing, and blocks recording
 * until it lands. */

const KEY = "dpp.scroll";
/** Offsets below this count as "at the top" and are not stored. */
const MIN_Y = 24;
/** Re-apply while layout is still settling (fonts, tabs, disclosures, widgets). */
const REAPPLY_AT = [40, 140, 320, 600];
/** Give up chasing an offset the page never grows enough to reach. */
const CHASE_LIMIT = 2000;
/** Treat this close to the target as landed. */
const LANDED_WITHIN = 2;

/** Offsets this document has changed but not yet written out. null means delete. */
const pending = new Map<string, number | null>();
let writeTimer = 0;

function readStore(): Record<string, number> {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as Record<string, number>) : {};
  } catch {
    return {};
  }
}

/** Storage as it stands, with this document's unwritten changes applied on top.
 *  Read through rather than cached, so another tab's offsets are never
 *  clobbered by a stale copy on the way out. */
function merged(): Record<string, number> {
  const out = readStore();
  for (const [id, y] of pending) {
    if (y === null) delete out[id];
    else out[id] = y;
  }
  return out;
}

function flush() {
  if (writeTimer) {
    window.clearTimeout(writeTimer);
    writeTimer = 0;
  }
  if (!pending.size) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(merged()));
    pending.clear();
  } catch {
    /* ignore */
  }
}

function persist() {
  // Scrolling fires often and localStorage is synchronous, so batch the writes.
  if (writeTimer) return;
  writeTimer = window.setTimeout(() => {
    writeTimer = 0;
    flush();
  }, 500);
}

export function getScrollFor(id: SectionId): number {
  const y = merged()[id];
  return typeof y === "number" && y > MIN_Y ? y : 0;
}

export function setScrollFor(id: SectionId, y: number) {
  pending.set(id, y > MIN_Y ? Math.round(y) : null);
  persist();
}

export function clearScrollMemory() {
  pending.clear();
  if (writeTimer) {
    window.clearTimeout(writeTimer);
    writeTimer = 0;
  }
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

function currentY(): number {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/**
 * Restores the remembered offset whenever `route` changes, and keeps that
 * section's offset up to date while the reader scrolls.
 */
export function useScrollMemory(route: SectionId) {
  const activeRef = useRef(route);
  /** Set while this module is moving the page, to keep the restore's own
   *  offsets, and any clamped ones, out of the store. */
  const restoringRef = useRef(false);

  useEffect(() => {
    activeRef.current = route;
    const target = getScrollFor(route);
    const el = (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
    const timers: number[] = [];
    const pendingVisibilityListeners: (() => void)[] = [];
    let observer: ResizeObserver | null = null;
    let finished = false;
    restoringRef.current = target > 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      restoringRef.current = false;
      timers.forEach((t) => window.clearTimeout(t));
      timers.length = 0;
      observer?.disconnect();
      pendingVisibilityListeners.forEach((fn) => document.removeEventListener("visibilitychange", fn));
      pendingVisibilityListeners.length = 0;
      window.removeEventListener("wheel", onInput);
      window.removeEventListener("touchstart", onInput);
      window.removeEventListener("keydown", onInput);
    };

    const apply = () => {
      if (finished) return;
      // An inline value beats the stylesheet's scroll-behavior: smooth, so the
      // restore is an instant jump and raises no intermediate offsets.
      const prev = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.scrollTop = target;
      window.scrollTo(0, target);
      el.style.scrollBehavior = prev;
      // Nudge the scroll-linked reveals and the reading progress bar.
      window.dispatchEvent(new Event("scroll"));
      if (Math.abs(currentY() - target) <= LANDED_WITHIN) finish();
    };

    // A deliberate scroll from the reader ends the restore, so we never fight them.
    const onInput = () => finish();
    window.addEventListener("wheel", onInput, { passive: true });
    window.addEventListener("touchstart", onInput, { passive: true });
    window.addEventListener("keydown", onInput);

    // The page keeps growing as mount animations settle, so chase the offset
    // rather than assuming a fixed number of frames is enough.
    const begin = () => {
      if (finished) return;
      apply();
      // The page keeps growing as mount animations settle, so chase the offset
      // rather than assuming a fixed number of frames is enough.
      if (finished) return;
      REAPPLY_AT.forEach((ms) => timers.push(window.setTimeout(apply, ms)));
      timers.push(window.setTimeout(finish, CHASE_LIMIT));
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(() => apply());
        observer.observe(document.documentElement);
        if (document.body) observer.observe(document.body);
      }
    };

    // A hidden document cannot be scrolled and freezes timers, so restoring now
    // would quietly fail. Browsers restore tabs in the background, so wait for
    // the tab to be looked at instead. Recording stays blocked until then, so
    // nothing overwrites the offset in the meantime.
    if (target > 0 && document.visibilityState === "hidden") {
      const onVisible = () => {
        if (document.visibilityState !== "hidden") {
          document.removeEventListener("visibilitychange", onVisible);
          begin();
        }
      };
      document.addEventListener("visibilitychange", onVisible);
      pendingVisibilityListeners.push(onVisible);
    } else {
      begin();
    }

    return () => {
      const chasing = restoringRef.current;
      finish();
      // Cleanup runs before the incoming section moves the page, so this is the
      // outgoing section's true offset. Skip it while a restore is still
      // chasing, when the current offset is a clamped artefact rather than a
      // place the reader chose.
      if (!chasing) {
        setScrollFor(activeRef.current, currentY());
        flush();
      }
    };
  }, [route]);

  useEffect(() => {
    let frame = 0;
    const record = () => {
      frame = 0;
      if (restoringRef.current) return;
      setScrollFor(activeRef.current, currentY());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(record);
    };
    const onLeave = () => {
      if (restoringRef.current) return;
      setScrollFor(activeRef.current, currentY());
      flush();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onLeave);
    document.addEventListener("visibilitychange", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onLeave);
      document.removeEventListener("visibilitychange", onLeave);
    };
  }, []);
}
