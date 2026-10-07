import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { isStaticRender } from "@/lib/staticRender";

/* ------------------------------ Scroll reveal -----------------------------
 * Uses a manual IntersectionObserver. Its initial callback reliably reports
 * current intersection, so elements in view on mount reveal immediately and
 * below-fold elements reveal on scroll. A short mount fallback guarantees
 * content is never left invisible if the observer is unavailable. */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce || shown) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    io.observe(el);
    // Fallback: never leave content hidden.
    const t = window.setTimeout(() => setShown(true), 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [reduce, shown]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- Disclosure ------------------------------- */
export function Disclosure({
  summary,
  meta,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  children,
  icon,
}: {
  summary: ReactNode;
  meta?: ReactNode;
  defaultOpen?: boolean;
  /** Controlled open state. Omit to let the disclosure manage its own. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  icon?: ReactNode;
}) {
  const staticMode = isStaticRender();
  const [uncontrolled, setUncontrolled] = useState(defaultOpen || staticMode);
  const open = openProp ?? uncontrolled;
  const id = useId();

  function toggle() {
    const next = !open;
    setUncontrolled(next);
    onOpenChange?.(next);
  }

  const body = (
    <div className="border-t border-border px-4 py-4 text-sm leading-relaxed text-fg-muted sm:px-5">{children}</div>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-bg-muted sm:px-5"
      >
        {icon && <span className="shrink-0 text-accent">{icon}</span>}
        <span className="flex-1 text-sm font-semibold text-fg sm:text-[0.95rem]">{summary}</span>
        {meta && <span className="hidden shrink-0 text-xs text-fg-subtle sm:block">{meta}</span>}
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {staticMode ? (
        <div id={id}>{body}</div>
      ) : (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {body}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/* ---------------------------------- Tabs ---------------------------------- */
export function Tabs({
  tabs,
  className,
}: {
  tabs: { id: string; label: ReactNode; content: ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  if (isStaticRender()) {
    return (
      <div className={className}>
        {tabs.map((t) => (
          <div key={t.id} className="mt-5">
            <p className="mb-2 text-sm font-semibold text-fg">{t.label}</p>
            {t.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex flex-wrap gap-1 rounded-lg border border-border bg-bg-muted p-1"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "relative flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active === t.id ? "text-accent-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            {active === t.id && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-md bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{t.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {current?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------------------- Segmented control --------------------------- */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = "md",
}: {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="inline-flex max-w-full flex-wrap gap-1 rounded-lg border border-border bg-bg-muted p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "relative flex-1 rounded-md font-medium transition-colors",
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
            value === o.value ? "text-accent-fg" : "text-fg-muted hover:text-fg",
          )}
        >
          {value === o.value && (
            <motion.span
              layoutId={`seg-${options.map((x) => x.value).join("")}`}
              className="absolute inset-0 rounded-md bg-accent"
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
            />
          )}
          <span className="relative z-10 whitespace-nowrap">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
