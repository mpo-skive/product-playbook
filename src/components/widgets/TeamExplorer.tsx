import { useState } from "react";
import { motion } from "motion/react";
import { Shield, UserCog, Boxes, Users, Info } from "lucide-react";
import { Segmented } from "@/components/interactive";
import { cn } from "@/lib/cn";
import { isStaticRender } from "@/lib/staticRender";

type Scale = "poc" | "pov" | "fsd" | "outsourced";

const SCALES: { value: Scale; label: string }[] = [
  { value: "poc", label: "Proof of concept" },
  { value: "pov", label: "Proof of value" },
  { value: "fsd", label: "FSD" },
  { value: "outsourced", label: "Co-sourced" },
];

const NOTES: Record<Scale, string> = {
  poc: "Starts off with one squad to prove that the product is technically feasible. The squad's product, UX and engineering members also act as the Product, UX and Tech Leads.",
  pov: "Proving the metric can move. Prioritise the few features the MVP needs to shift it, then add a squad for each.",
  fsd: "Full scale development, once the value is proven. Multiple sub-products, each with its own squads.",
  outsourced: "One in-house squad sets direction and standards, working alongside several vendor squads.",
};

export function TeamExplorer() {
  const [scale, setScale] = useState<Scale>("pov");
  const squadCount = scale === "poc" ? 1 : scale === "pov" ? 2 : scale === "fsd" ? 4 : 3;

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
            desc="Holds the OM accountable, clears blockers, makes cross-priority trade-offs."
            tone="board"
          />
          <Connector />

          {/* Working Committee: the accountable owner, and the Leads that join as the product grows */}
          <div className="w-full rounded-xl border border-border bg-bg-subtle p-3 sm:p-4">
            <p className="mb-3 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-fg-subtle">
              Working Committee
            </p>

            <div className="mx-auto max-w-md overflow-hidden rounded-xl border-2 border-accent bg-accent-subtle">
              <div className="px-3 py-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-accent">
                Accountable owner
              </div>
              <div className="bg-surface p-3 text-center">
                <p className="text-sm font-semibold text-fg">Ops Manager (OM)</p>
                <p className="mt-0.5 text-[0.7rem] leading-snug text-fg-muted">Owns the problem and the outcome</p>
              </div>
            </div>

            <p className="mb-2 mt-4 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-fg-subtle">
              The Leads
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <RoleCard icon={UserCog} title="Product Lead" sub="Vision, strategy, roadmap" />
              <RoleCard icon={UserCog} title="UX Lead" sub="Experience and research" />
              <RoleCard icon={UserCog} title="Tech Lead" sub="Architecture and standards" />
              <RoleCard icon={UserCog} title="Programme Lead" sub="Workstreams, funding, procurement" />
            </div>
          </div>
          <Connector />

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
                    Product Manager, UX, software engineers, Programme Manager.
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

        {isStaticRender() && (
          <div className="mt-3 space-y-2">
            {SCALES.filter((s) => s.value !== scale).map((s) => (
              <p key={s.value} className="text-sm text-fg-muted">
                <strong className="text-fg">{s.label}.</strong> {NOTES[s.value]}
              </p>
            ))}
          </div>
        )}
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

function RoleCard({ icon: Icon, title, sub }: { icon: typeof Users; title: string; sub: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3 text-center">
      <Icon className="mx-auto mb-1 h-4 w-4 text-accent" />
      <p className="text-sm font-semibold text-fg">{title}</p>
      <p className="mt-0.5 text-[0.7rem] text-fg-muted">{sub}</p>
    </div>
  );
}
