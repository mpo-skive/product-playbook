import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import {
  Menu,
  X,
  Sun,
  Moon,
  UserRound,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  RotateCcw,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useStore } from "@/lib/store";
import { useHashRoute } from "@/lib/useHashRoute";
import { useScrollMemory } from "@/lib/scrollMemory";
import {
  SECTIONS,
  SECTION_MAP,
  PERSONA_MAP,
  orderedSections,
  type SectionId,
} from "@/content/meta";
import { BrandMark } from "@/components/BrandMark";
import { PersonaPicker } from "@/components/PersonaPicker";
import { Badge } from "@/components/ui";
import { SECTION_COMPONENTS } from "@/sections";
import { cn } from "@/lib/cn";

export default function App() {
  const { mode, toggle } = useTheme();
  const { persona, craft, visited, markVisited } = useStore();
  const [route, navigate] = useHashRoute();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Prompt for a profile on first visit.
  useEffect(() => {
    try {
      const seen = localStorage.getItem("dpp.onboarded");
      if (!seen && !persona) {
        setPickerOpen(true);
        localStorage.setItem("dpp.onboarded", "1");
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resume each section where the reader left off, rather than at the top.
  useScrollMemory(route);

  useEffect(() => {
    markVisited(route);
    setDrawerOpen(false);
  }, [route, markVisited]);

  const navOrder = useMemo(() => orderedSections(persona), [persona]);
  const coreSet = useMemo(() => new Set(persona ? PERSONA_MAP[persona].core : []), [persona]);

  const Section = SECTION_COMPONENTS[route];

  // prev/next follow the persona path (or canonical order)
  const flowOrder: SectionId[] = persona ? PERSONA_MAP[persona].path : navOrder;
  const idx = flowOrder.indexOf(route);
  const prev = idx > 0 ? flowOrder[idx - 1] : null;
  const next = idx >= 0 && idx < flowOrder.length - 1 ? flowOrder[idx + 1] : null;

  return (
    <div className="min-h-dvh bg-bg">
      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
          <button
            className="rounded-md p-1.5 text-fg-muted transition-colors hover:bg-bg-muted lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button onClick={() => navigate("home")} className="flex items-center gap-2.5">
            <BrandMark />
            <span className="flex flex-col leading-none">
              <span className="text-sm font-semibold text-fg">Defence Product Playbook</span>
              <span className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-fg-subtle">
                MINDEF <span className="text-accent">×</span> DSTA
              </span>
            </span>
          </button>

          <div className="flex-1" />

          <button
            onClick={() => setPickerOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-border-strong px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-fg sm:inline-flex"
          >
            <UserRound className="h-3.5 w-3.5" />
            {persona ? (
              <span>
                {PERSONA_MAP[persona].label}
                {craft ? ` · ${craft}` : ""}
              </span>
            ) : (
              "Choose profile"
            )}
          </button>

          <button
            onClick={toggle}
            aria-label="Toggle colour mode"
            className="rounded-md p-2 text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mode}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {mode === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-72 shrink-0 overflow-y-auto border-r border-border px-3 py-6 lg:block">
          <SideNav
            navOrder={navOrder}
            coreSet={coreSet}
            route={route}
            navigate={navigate}
            visited={visited}
            persona={persona}
            onOpenPicker={() => setPickerOpen(true)}
          />
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-3xl">
            {/* Keyed plain div, not AnimatePresence: the section must render even if
                the animation frame loop is throttled (backgrounded tab, reduced motion).
                The fade-in is CSS with no fill mode, so content is visible regardless. */}
            <div key={route} className="dpp-section-in">
              {Section ? <Section navigate={navigate} openPicker={() => setPickerOpen(true)} /> : null}
            </div>

            {/* Prev / next */}
            {route !== "home" && (prev || next) && (
              <nav className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
                {prev ? (
                  <PrevNext dir="prev" id={prev} onClick={() => navigate(prev)} />
                ) : (
                  <div className="hidden sm:block" />
                )}
                {next ? <PrevNext dir="next" id={next} onClick={() => navigate(next)} /> : <div />}
              </nav>
            )}

            <Footer />
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
            <motion.aside
              className="absolute inset-y-0 left-0 w-[82%] max-w-xs overflow-y-auto border-r border-border bg-bg-subtle px-3 py-5"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
            >
              <div className="mb-4 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <BrandMark className="h-6 w-6" />
                  <span className="text-sm font-semibold">Playbook</span>
                </div>
                <button onClick={() => setDrawerOpen(false)} aria-label="Close" className="rounded-md p-1.5 hover:bg-bg-muted">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SideNav
                navOrder={navOrder}
                coreSet={coreSet}
                route={route}
                navigate={navigate}
                visited={visited}
                persona={persona}
                onOpenPicker={() => {
                  setDrawerOpen(false);
                  setPickerOpen(true);
                }}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <PersonaPicker open={pickerOpen} onClose={() => setPickerOpen(false)} onPicked={() => { /* stay */ }} />
    </div>
  );
}

/* -------------------------------- Side nav -------------------------------- */
function SideNav({
  navOrder,
  coreSet,
  route,
  navigate,
  visited,
  persona,
  onOpenPicker,
}: {
  navOrder: SectionId[];
  coreSet: Set<SectionId>;
  route: SectionId;
  navigate: (id: SectionId) => void;
  visited: Set<SectionId>;
  persona: string | null;
  onOpenPicker: () => void;
}) {
  const readCount = navOrder.filter((id) => visited.has(id)).length;
  const pct = Math.round((readCount / navOrder.length) * 100);

  // Split into core path vs the rest when a persona is active.
  const coreList = persona ? navOrder.filter((id) => coreSet.has(id)) : navOrder;
  const restList = persona ? navOrder.filter((id) => !coreSet.has(id)) : [];

  return (
    <nav className="flex flex-col gap-1">
      <button
        onClick={() => navigate("home")}
        className={cn(
          "mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          route === "home" ? "bg-accent-subtle text-accent" : "text-fg-muted hover:bg-bg-muted hover:text-fg",
        )}
      >
        {SECTION_MAP.home.icon && <SECTION_MAP.home.icon className="h-4 w-4" />}
        Start here
      </button>

      {/* progress */}
      <div className="mb-3 px-3">
        <div className="mb-1.5 flex items-center justify-between text-[0.7rem] font-medium text-fg-subtle">
          <span>{persona ? "Your path" : "Progress"}</span>
          <span className="dpp-tabular">{pct}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-bg-muted">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {persona && (
        <p className="mb-1 px-3 text-[0.68rem] font-semibold uppercase tracking-wider text-fg-subtle">Core for you</p>
      )}
      {coreList.map((id) => (
        <NavItem key={id} id={id} route={route} navigate={navigate} visited={visited} highlight={coreSet.has(id)} />
      ))}

      {restList.length > 0 && (
        <>
          <p className="mt-3 mb-1 px-3 text-[0.68rem] font-semibold uppercase tracking-wider text-fg-subtle">
            Also useful
          </p>
          {restList.map((id) => (
            <NavItem key={id} id={id} route={route} navigate={navigate} visited={visited} highlight={false} />
          ))}
        </>
      )}

      <div className="mt-3 border-t border-border pt-3">
        <NavItem id="glossary" route={route} navigate={navigate} visited={visited} highlight={false} />
        <button
          onClick={onOpenPicker}
          className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {persona ? "Change profile" : "Choose a profile"}
        </button>
      </div>
    </nav>
  );
}

function NavItem({
  id,
  route,
  navigate,
  visited,
  highlight,
}: {
  id: SectionId;
  route: SectionId;
  navigate: (id: SectionId) => void;
  visited: Set<SectionId>;
  highlight: boolean;
}) {
  const s = SECTION_MAP[id];
  const active = route === id;
  const Icon = s.icon;
  return (
    <button
      onClick={() => navigate(id)}
      className={cn(
        "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
        active ? "bg-accent-subtle font-medium text-accent" : "text-fg-muted hover:bg-bg-muted hover:text-fg",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-accent" : highlight ? "text-fg-muted" : "text-fg-subtle")} />
      <span className="flex-1 text-left">{s.label}</span>
      {visited.has(id) && !active ? (
        <Check className="h-3.5 w-3.5 text-success/70" />
      ) : (
        <span className="flex items-center gap-0.5 text-[0.68rem] text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100">
          <Clock className="h-3 w-3" />
          {s.readMins}
        </span>
      )}
    </button>
  );
}

function PrevNext({ dir, id, onClick }: { dir: "prev" | "next"; id: SectionId; onClick: () => void }) {
  const s = SECTION_MAP[id];
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col gap-1 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong",
        dir === "next" ? "text-right sm:items-end" : "text-left",
      )}
    >
      <span className="flex items-center gap-1.5 text-xs font-medium text-fg-subtle">
        {dir === "prev" && <ArrowLeft className="h-3.5 w-3.5" />}
        {dir === "prev" ? "Previous" : "Next"}
        {dir === "next" && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="text-sm font-semibold text-fg">{s.title}</span>
    </button>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-border pt-8 text-sm text-fg-muted">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <div className="mb-2 flex items-center gap-2">
            <BrandMark className="h-6 w-6" />
            <span className="font-semibold text-fg">The Defence Product Playbook</span>
          </div>
          <p className="text-[0.85rem] leading-relaxed text-fg-subtle">
            Jointly developed by MINDEF and DSTA. A practical guide to product ways of working for the defence
            ecosystem.
          </p>
        </div>
        <div className="text-[0.82rem] leading-relaxed text-fg-subtle">
          <p className="mb-1 font-medium text-fg-muted">Co-authored by</p>
          <p>Tan Min Min, MPO</p>
          <p>Alvin Loh, DSTA</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
        <Badge tone="outline">Unclassified</Badge>
        <Badge tone="outline">Version 1.0</Badge>
        <span>Built on PRIZM 4.0 Enterprise.</span>
      </div>
    </footer>
  );
}
