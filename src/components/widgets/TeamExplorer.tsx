import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Shield, UserCog, Boxes, Users, Info } from "lucide-react";
import { Segmented } from "@/components/interactive";
import { cn } from "@/lib/cn";

type Scale = "poc" | "small" | "large" | "outsourced";

const SCALES: { value: Scale; label: string }[] = [
  { value: "poc", label: "Proof of concept" },
  { value: "small", label: "Small product" },
  { value: "large", label: "Large product" },
  { value: "outsourced", label: "Co-sourced" },
];

const NOTES: Record<Scale, string> = {
  poc: "One squad. The PM, Engineering Manager and Designer also act as the Product, Tech and Design Leads. Follow the principles, not the full form.",
  small: "One accountable OM in a two-in-a-box with a Product Lead, a lean Working Committee, and one to three squads of around eight people each.",
  large: "Multiple sub-products, each with its own squads. Programme Management handles coordination, funding, procurement, standards and measurement across them.",
  outsourced: "One in-house squad sets direction and standards, working alongside several vendor squads. Strategic product and tech capability stays in-house.",
};

export function TeamExplorer() {
  const [scale, setScale] = useState<Scale>("small");
  const showLeads = scale !== "poc";
  const showProgramme = scale === "large";
  const squadCount = scale === "poc" ? 1 : scale === "small" ? 2 : scale === "large" ? 4 : 3;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex flex-col gap-3 border-b border-border bg-bg-subtle px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <span className="text-sm font-semibold text-fg">Team structure explorer</span>
        <Segmented size="sm" value={scale} onChange={(v) => setScale(v as Scale)} options={SCALES} />
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col items-center gap-3">
          {/* Steering Committee */}
          <Tier
            icon={Shield}
            title="Steering Committee"
            people="Senior sponsors with a stake in the problem"
            desc="Holds the OM accountable, clears blockers, vests the levers, makes cross-priority trade-offs."
            tone="board"
          />
          <Connector />

          {/* Working Committee: the two-in-a-box sits inside it, with the Leads */}
          <div className="w-full rounded-xl border border-border bg-bg-subtle p-3 sm:p-4">
            <p className="mb-3 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-fg-subtle">
              Working Committee
            </p>

            <div className="mx-auto flex max-w-md flex-col overflow-hidden rounded-xl border-2 border-accent bg-accent-subtle">
              <div className="px-3 py-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-accent">
                Business Owner, two-in-a-box
              </div>
              <div className="grid grid-cols-2 gap-px bg-accent/30">
                <BoxHalf title="Ops Manager (OM)" sub="Owns the problem, the outcome and the ops levers" />
                <BoxHalf title="Product Lead" sub="Brings product and engineering judgement" />
              </div>
            </div>
            <p className="mx-auto mt-2 max-w-md text-center text-xs text-fg-subtle">
              Joint decision-makers, and the core of the Working Committee. Where the problem needs no policy lever,
              this is the whole ownership layer.
            </p>

            <AnimatePresence initial={false}>
              {showLeads && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full overflow-hidden"
                >
                  <p className="mb-2 mt-4 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-fg-subtle">
                    The Leads
                  </p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <RoleCard icon={UserCog} title="Product Lead" sub="Vision, strategy, roadmap" />
                    <RoleCard icon={UserCog} title="Tech Lead" sub="Architecture and standards" />
                    <RoleCard icon={UserCog} title="Design Lead" sub="Experience and research" />
                  </div>
                  <p className="mt-2 text-center text-xs text-fg-subtle">
                    One member per lever needed to move the problem. The OM adds any operational leads required.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Connector />

          {/* Programme Management */}
          <AnimatePresence initial={false}>
            {showProgramme && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full overflow-hidden"
              >
                <div className="mx-auto max-w-lg rounded-lg border border-dashed border-border-strong bg-bg-subtle px-4 py-3 text-center">
                  <p className="text-sm font-semibold text-fg">Programme Management</p>
                  <p className="mt-0.5 text-xs text-fg-muted">
                    Workstream coordination, funding and procurement, standards and staffing, performance measurement
                    and support across sub-products.
                  </p>
                </div>
                <div className="mt-3 flex justify-center">
                  <Connector />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Squads */}
          <div className="w-full">
            <p className="mb-2 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-fg-subtle">
              {squadCount} {squadCount === 1 ? "squad" : "squads"}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {Array.from({ length: squadCount }).map((_, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "rounded-lg border bg-bg-subtle p-3",
                    scale === "outsourced" && i > 0 ? "border-dashed border-border-strong" : "border-border",
                  )}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <Boxes className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-fg">
                      Squad {i + 1}
                      {scale === "outsourced" && i > 0 && (
                        <span className="ml-1.5 text-[0.65rem] font-medium text-fg-subtle">vendor</span>
                      )}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-fg-muted">
                    {scale === "poc"
                      ? "PM, Engineering Manager, Designer, engineers. Also the Leads."
                      : "Product Manager, Engineering Manager, Designer, software engineers."}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          key={scale}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-start gap-2 rounded-lg border border-border border-l-4 border-l-accent bg-bg-subtle p-3.5"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="text-sm text-fg-muted">{NOTES[scale]}</p>
        </motion.div>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="h-5 w-px bg-border-strong" />;
}

function Tier({
  icon: Icon,
  title,
  people,
  desc,
  tone,
}: {
  icon: typeof Shield;
  title: string;
  people: string;
  desc: string;
  tone: "board";
}) {
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-bg-subtle p-4 text-center">
      <div className="mb-1.5 flex items-center justify-center gap-2">
        <Icon className="h-4 w-4 text-fg-muted" />
        <span className="text-sm font-semibold text-fg">{title}</span>
      </div>
      <p className="text-xs font-medium text-accent">{people}</p>
      <p className="mt-1 text-xs leading-relaxed text-fg-muted">{desc}</p>
    </div>
  );
}

function BoxHalf({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="bg-surface p-3 text-center">
      <p className="text-sm font-semibold text-fg">{title}</p>
      <p className="mt-0.5 text-[0.7rem] leading-snug text-fg-muted">{sub}</p>
    </div>
  );
}

function RoleCard({ icon: Icon, title, sub }: { icon: typeof Users; title: string; sub: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3 text-center">
      <Icon className="mx-auto mb-1 h-4 w-4 text-accent" />
      <p className="text-sm font-semibold text-fg">{title}</p>
      <p className="mt-0.5 text-[0.7rem] text-fg-muted">{sub}</p>
    </div>
  );
}
