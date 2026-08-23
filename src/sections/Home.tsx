import { ArrowRight, Clock, Compass, Sparkles, Target, Users, FlaskConical } from "lucide-react";
import { motion } from "motion/react";
import {
  SECTIONS,
  SECTION_MAP,
  PERSONA_MAP,
  totalReadMins,
  CANONICAL_ORDER,
  CANONICAL_CORE,
  type SectionId,
} from "@/content/meta";
import { useStore } from "@/lib/store";
import { Button, Badge, Card, Kicker } from "@/components/ui";
import { Reveal } from "@/components/interactive";
import { BrandMark } from "@/components/BrandMark";
import type { SectionProps } from "./_shell";
import { cn } from "@/lib/cn";

export default function Home({ navigate, openPicker }: SectionProps) {
  const { persona, craft } = useStore();
  const p = persona ? PERSONA_MAP[persona] : null;
  const path = p ? p.path : CANONICAL_ORDER;

  return (
    <div>
      {/* Hero */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 -top-16 h-64 dpp-grid-bg opacity-60" aria-hidden />
        <Reveal>
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-9" />
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-fg-subtle">
              MINDEF <span className="text-accent">×</span> DSTA
            </span>
          </div>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl">
            Build products that move the mission.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            A practical guide to product ways of working for defence. Define the problem worth solving, structure a team
            that can solve it, and test with real users.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={openPicker}>
              <Compass className="h-4 w-4" />
              {persona ? "Change your path" : "Personalise my path"}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate(path[0])}>
              {persona ? "Continue reading" : "Read from the top"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-fg-muted">
            <Stat value="9" label="sections" />
            <Stat value={`${totalReadMins()}`} label="min end to end" />
            <Stat value="5" label="interactive tools" />
            <Stat value="4" label="frameworks" />
          </div>
        </Reveal>
      </div>

      {/* Personalised path */}
      <Reveal delay={0.05}>
        <Card className="mt-12 overflow-hidden">
          <div className="border-b border-border bg-bg-subtle px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-fg">
                  {p ? `Your path as ${p.label}${craft ? ` · ${craft}` : ""}` : "Recommended reading order"}
                </span>
              </div>
              <button
                onClick={openPicker}
                className="text-xs font-medium text-accent underline-offset-2 hover:underline"
              >
                {p ? "Change profile" : "Pick a profile to tailor this"}
              </button>
            </div>
            {p && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">{p.summary}</p>}
          </div>
          <div className="p-3 sm:p-4">
            <ol className="flex flex-col">
              {path.map((id, i) => (
                <PathStep
                  key={id}
                  id={id}
                  index={i}
                  isCore={(p ? p.core : CANONICAL_CORE).includes(id)}
                  onClick={() => navigate(id)}
                  last={i === path.length - 1}
                />
              ))}
            </ol>
          </div>
        </Card>
      </Reveal>

      {/* What's inside */}
      <div className="mt-14">
        <Kicker>What is inside</Kicker>
        <h2 className="mt-3 text-2xl font-semibold text-fg">Nine sections</h2>
        <p className="mt-2 max-w-2xl text-fg-muted">Read it in order, or jump to what you need.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {SECTIONS.filter((s) => s.id !== "home" && s.id !== "glossary").map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i * 0.04, 0.24)}>
              <button
                onClick={() => navigate(s.id)}
                className="group flex h-full w-full items-start gap-3.5 rounded-xl border border-border bg-surface p-4 text-left transition-all duration-200 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                  <s.icon className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-fg">{s.title}</span>
                    {s.framework && (
                      <span className="hidden text-[0.65rem] font-medium uppercase tracking-wide text-fg-subtle sm:inline">
                        {s.framework}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{s.blurb}</span>
                  <span className="mt-2 flex items-center gap-1 text-xs text-fg-subtle">
                    <Clock className="h-3 w-3" />
                    {s.readMins} min
                  </span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* How to read */}
      <Reveal>
        <Card className="mt-12 p-6 sm:p-7" accent>
          <h3 className="text-lg font-semibold text-fg">How to read this playbook</h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            <HowTo icon={Target} title="At your own pace">
              Every section shows its reading time and remembers what you have read. Dip in and return where you left
              off.
            </HowTo>
            <HowTo icon={Users} title="Shaped around you">
              Your profile reorders the sections and marks the ones that matter most.
            </HowTo>
            <HowTo icon={FlaskConical} title="Built to try">
              Score a problem statement, climb the metric ladder, or size a team. The tools are live.
            </HowTo>
          </div>
        </Card>
      </Reveal>

    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-2xl font-semibold text-fg dpp-tabular">{value}</span>
      <span className="text-sm text-fg-subtle">{label}</span>
    </div>
  );
}

function PathStep({
  id,
  index,
  isCore,
  onClick,
  last,
}: {
  id: SectionId;
  index: number;
  isCore: boolean;
  onClick: () => void;
  last: boolean;
}) {
  const s = SECTION_MAP[id];
  return (
    <li>
      <button
        onClick={onClick}
        className="group flex w-full items-center gap-3.5 rounded-lg px-2.5 py-2.5 text-left transition-colors hover:bg-bg-muted"
      >
        <div className="relative flex flex-col items-center self-stretch">
          <span
            className={cn(
              "z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
              isCore ? "bg-accent text-accent-fg" : "bg-bg-muted text-fg-muted ring-1 ring-border",
            )}
          >
            {index + 1}
          </span>
          {!last && <span className="absolute top-7 h-[calc(100%-0.5rem)] w-px bg-border" />}
        </div>
        <s.icon className="h-4 w-4 shrink-0 text-fg-subtle" />
        <span className="flex-1">
          <span className="text-sm font-medium text-fg">{s.title}</span>
          {isCore && <span className="ml-2 text-[0.68rem] font-semibold uppercase tracking-wide text-accent">Core</span>}
        </span>
        <span className="flex items-center gap-1 text-xs text-fg-subtle">
          <Clock className="h-3 w-3" />
          {s.readMins}
        </span>
        <ArrowRight className="h-4 w-4 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
    </li>
  );
}

function HowTo({ icon: Icon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle text-accent">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm font-semibold text-fg">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{children}</p>
    </div>
  );
}
