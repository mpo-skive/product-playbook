import { useState } from "react";
import { motion } from "motion/react";
import { Building2, UserCog, Boxes, Flag, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Callout, Prose, Card, Badge } from "@/components/ui";
import { Reveal } from "@/components/interactive";
import { SectionHead, Block, type SectionProps } from "./_shell";
import { cn } from "@/lib/cn";

const LEVELS = [
  {
    id: "org",
    icon: Building2,
    name: "Organisation",
    success: "Leadership sets clear direction, builds accountability, and actively enables teams to work this way.",
    indicators: [
      "Tech priorities clearly linked to operational priorities",
      "A senior product, engineering and design leadership team with a mandate over key products",
      "Median launch velocity under three to six months",
    ],
  },
  {
    id: "om",
    icon: UserCog,
    name: "Ops Manager",
    success: "OMs are accountable for solving problems and can align teams towards the outcome.",
    indicators: [
      "OMs write clear 4C problem statements",
      "OMs define value metrics that contribute to priorities",
      "OMs direct their product at least fortnightly",
    ],
  },
  {
    id: "product",
    icon: Boxes,
    name: "Product",
    success: "Teams adopt the practices that let them improve their key metric.",
    indicators: [
      "Clear problem statement and relevant value metric",
      "Single-line accountability to the OM",
      "Testing with real users and releasing at least quarterly",
      "Metric improving year on year; priority products reviewed quarterly",
    ],
  },
];

export default function Start(_: SectionProps) {
  const [level, setLevel] = useState("om");
  const cur = LEVELS.find((l) => l.id === level)!;

  return (
    <div>
      <SectionHead id="start">
        Start by seeing what good looks like, and how far you are from it. Then close that gap with two or three teams
        before you take it wider.
      </SectionHead>

      <Block eyebrow="Where you stand" title="What good looks like at three levels">
        <Prose className="mb-5">
          <p>
            Three groups have to change: the organisation, the Ops Manager, and the product team. Each one below shows
            what good looks like, and the signs that tell you it is happening. Be honest about where you are today.
            Select a level.
          </p>
        </Prose>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors",
                level === l.id ? "border-accent bg-accent-subtle" : "border-border bg-surface hover:border-border-strong",
              )}
            >
              <l.icon className={cn("h-5 w-5", level === l.id ? "text-accent" : "text-fg-subtle")} />
              <span className={cn("text-xs font-semibold sm:text-sm", level === l.id ? "text-accent" : "text-fg")}>{l.name}</span>
            </button>
          ))}
        </div>
        <motion.div key={level} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">What good looks like</p>
            <p className="mt-1.5 text-base font-medium text-fg">{cur.success}</p>
            <div className="mt-4 space-y-2 border-t border-border pt-4">
              {cur.indicators.map((ind) => (
                <div key={ind} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm text-fg-muted">{ind}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </Block>

      <Block eyebrow="The rollout" title="Three phases, starting small">
        <div className="space-y-3">
          {[
            { icon: Flag, t: "Pilot with two or three teams", d: "Pick sub-problems that are critical and urgent in the next six months, and that a digital solution can plausibly move. Baseline every maturity indicator and set a target with your sponsor.", tag: "Now" },
            { icon: ArrowUpRight, t: "Expand to the problem space", d: "Once a pilot succeeds, widen to the larger problem it contributes to, bringing in the other products that shape that outcome. Baseline and measure again.", tag: "Next" },
            { icon: Building2, t: "Expand across the organisation", d: "When the evidence convinces you the practices help teams solve problems better, roll them out organisation-wide.", tag: "Later" },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div className="relative flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                  <p.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-fg">{p.t}</span>
                    <Badge tone="accent">{p.tag}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block eyebrow="Change, honestly" title="What this really asks of the organisation">
        <Prose>
          <p>
            Start with a senior sponsor at Chief or CE-equivalent level, because this is genuine change management, not
            a tooling swap. It means new roles and accountabilities, adjustments to procurement, funding and compliance
            so teams can move, and a rebalancing towards quality technical talent alongside operational staff.
          </p>
          <p>
            Measure the indicators monthly or quarterly. Where they improve, scale to more teams. Where they do not,
            reassess the blockers, whether change management, people, or finance and procurement, and adjust the
            approach. Treat the rollout itself as a product.
          </p>
        </Prose>
      </Block>

      <Callout tone="accent" title="The one-sentence version">
        <p>
          Put one accountable owner on a problem that matters, give them a metric and the levers to move it, and review
          the outcome, not the activity.
        </p>
      </Callout>
    </div>
  );
}
