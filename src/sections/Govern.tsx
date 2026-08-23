import { useState } from "react";
import { motion } from "motion/react";
import { Landmark, Users, Target, Compass, ClipboardCheck, LineChart, Crosshair, TrendingUp } from "lucide-react";
import { Callout, Prose, Card, Badge } from "@/components/ui";
import { Reveal, Disclosure } from "@/components/interactive";
import { Segmented } from "@/components/interactive";
import { SectionHead, Block, type SectionProps } from "./_shell";
import { cn } from "@/lib/cn";

type Crit = "high" | "medium" | "low";
const CADENCE: Record<Crit, { freq: string; who: string; note: string }> = {
  high: {
    freq: "Monthly",
    who: "Council chair, supported by the Product Lead and Engineering Lead",
    note: "Urgent and important problems inside the organisation's key priorities. Frequent, senior attention.",
  },
  medium: {
    freq: "Quarterly with the chair, monthly with the Product Lead",
    who: "Council chair-equivalent, then the Product Lead in between",
    note: "Important problems within the key priorities, but not urgent enough for monthly senior review.",
  },
  low: {
    freq: "Quarterly",
    who: "Product Lead",
    note: "Problems outside the key priorities. Light-touch oversight to catch drift.",
  },
};

export default function Govern(_: SectionProps) {
  const [crit, setCrit] = useState<Crit>("high");
  const c = CADENCE[crit];

  return (
    <div>
      <SectionHead id="govern">
        Governance is how the organisation holds teams to outcomes, clears their path, and decides where to invest.
        Product reviews need a standing body with the authority to act on what they surface. This section proposes one
        shape for it, and sets out the cadence and the questions that make a review worth holding.
      </SectionHead>

      <Block eyebrow="What it takes" title="Three things the reviewing body needs">
        <Prose>
          <p>
            Whoever runs these reviews needs three things at once: the authority to hold owners accountable, the
            seniority to clear blockers, and a view across the portfolio to decide where the investment goes. Where a
            forum already carries all three, use it. Where the remit is split across several, the council below is one
            shape worth considering.
          </p>
        </Prose>
      </Block>

      <Block eyebrow="Proposed" title="The Ops-Tech Product Council">
        <Reveal>
          <Card className="overflow-hidden" accent>
            <div className="border-b border-border bg-bg-subtle px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <Landmark className="h-4.5 w-4.5 text-accent" />
                <span className="text-base font-semibold text-fg">Ops-Tech Product Council (OTPC)</span>
                <Badge tone="accent">Proposed formation</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                A standing body that oversees a portfolio of product-critical problems. Chaired at Chief or
                CE-equivalent level, supported by the organisation's most senior product and engineering leaders. One
                council can serve MINDEF, an SAF Service, or DSTA, and convene jointly where a problem spans them.
              </p>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-3">
              <MandateCell icon={Target} title="Hold to account">
                Ensure each OM has a clear problem aligned to priorities, and metrics that show it moving.
              </MandateCell>
              <MandateCell icon={Compass} title="Empower">
                Vest the levers, clear blockers, and secure direct access to real users for testing.
              </MandateCell>
              <MandateCell icon={Users} title="Trade off">
                Decide across products where priorities, dependencies or security posture collide.
              </MandateCell>
            </div>
          </Card>
        </Reveal>
        <p className="mt-3 text-xs text-fg-subtle">
          The name is a proposal. What matters is a single accountable body with the seniority to vest levers and the
          discipline to review outcomes.
        </p>
      </Block>

      <Block eyebrow="Cadence" title="Review frequency follows criticality">
        <div className="mb-4">
          <Segmented
            value={crit}
            onChange={(v) => setCrit(v as Crit)}
            options={[
              { value: "high", label: "High criticality" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />
        </div>
        <motion.div key={crit} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">How often</p>
                <p className="mt-1 text-lg font-semibold text-accent">{c.freq}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Reviewed by</p>
                <p className="mt-1 text-sm font-medium text-fg">{c.who}</p>
              </div>
            </div>
            <p className="mt-4 border-t border-border pt-4 text-sm text-fg-muted">{c.note}</p>
          </Card>
        </motion.div>
      </Block>

      <Block eyebrow="Quality" title="What makes a good review">
        <Prose className="mb-5">
          <p>
            A good review checks progress on the problem and steers the OM where they are off track. It covers
            outcomes, what the team learned and what they propose to change, not status updates or implementation
            detail. Teams should come with their metric over the past quarter, what they learned from users, and the
            adjustments they want agreed.
          </p>
        </Prose>

        <p className="mb-3 text-sm font-medium text-fg-muted">Questions worth asking, by theme</p>
        <div className="space-y-3">
          <Disclosure summary="Problem and metric relevance" icon={<Target className="h-4 w-4" />}>
            Walk me through the problem and how you know it matters to operators. How does this metric connect to our
            priorities? What value would tell us the problem is solved in three to six months?
          </Disclosure>
          <Disclosure summary="Current performance" icon={<LineChart className="h-4 w-4" />}>
            What is the metric now, and how has it moved this quarter? What are the top three factors driving it? Which
            are within your control, and which need external change?
          </Disclosure>
          <Disclosure summary="Learning from users" icon={<Users className="h-4 w-4" />}>
            How many real operators have you tested with this month? What surprised you most? Show me a recent
            prototype. How did their feedback change your approach?
          </Disclosure>
          <Disclosure summary="Iteration velocity" icon={<ClipboardCheck className="h-4 w-4" />}>
            How long from user feedback to a shipped change? What is slowing you down? Are you testing with real
            operators or internal proxies?
          </Disclosure>
          <Disclosure summary="Trade-offs the council must make" icon={<Compass className="h-4 w-4" />}>
            What adjustments are you proposing? What operational change would speed you up? What trade-off between speed,
            scope and resources do you need from us?
          </Disclosure>
        </div>
      </Block>

      <Block eyebrow="Portfolio" title="Three signals leaders should track">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Crosshair, m: "% of products with a 4C problem statement", i: "A low figure points to capability gaps in OM roles. Consider training." },
            { icon: LineChart, m: "% with SMART, appropriately lagging value metrics", i: "A low figure means teams are defaulting to output metrics, not outcomes." },
            { icon: TrendingUp, m: "% improving their value metric year on year", i: "Flat or declining across the portfolio signals a systemic issue to investigate." },
          ].map((x, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <Card className="h-full p-5">
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                  <x.icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-sm font-semibold text-fg">{x.m}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{x.i}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Block>

      <Callout tone="info" title="A note on plateaus">
        <p>
          A metric that climbs then flattens is not always failure. It can mean the product has delivered its available
          value. That is the signal to shift it from active development to maintenance, and move the investment to a
          problem that can still move.
        </p>
      </Callout>
    </div>
  );
}

function MandateCell({ icon: Icon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) {
  return (
    <div className={cn("bg-surface p-4")}>
      <div className="mb-1.5 flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <span className="text-sm font-semibold text-fg">{title}</span>
      </div>
      <p className="text-sm leading-relaxed text-fg-muted">{children}</p>
    </div>
  );
}
