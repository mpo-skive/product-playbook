import { Target, Users, FlaskConical, ArrowRight } from "lucide-react";
import { Prose, Badge } from "@/components/ui";
import { Reveal } from "@/components/interactive";
import { DoubleDiamond } from "@/components/widgets/DoubleDiamond";
import { SectionHead, Block, type SectionProps } from "./_shell";

const MOVES = [
  {
    id: "problems",
    icon: Target,
    move: "Principle 01",
    framework: "METRIC",
    title: "Define real problems",
    sub: "Know the problem, and how you will prove it is solved.",
    body: "Product teams should be organised around solving the underlying problem rather than delivering a chosen solution, and should change how the mission is run, change the technology, or both, as needed to solve it. They should evaluate every intervention against an objective metric, so the team knows the problem is actually moving.",
    to: "problems" as const,
  },
  {
    id: "team",
    icon: Users,
    move: "Principle 02",
    framework: "TEAM",
    title: "Structure the team right",
    sub: "The right roles, one accountable owner, and the levers to decide.",
    body: "Product teams should hold the roles, domain knowledge and operational levers needed to make trade-offs across operations and technology, not just to implement requirements handed down to them. A single Ops Manager owns the problem and the outcome, two-in-a-box with a Product Lead, with product, engineering and design expertise inside the squad.",
    to: "team" as const,
  },
  {
    id: "test",
    icon: FlaskConical,
    move: "Principle 03",
    framework: "TEST",
    title: "Test early",
    sub: "Validate the theory of change before committing the build.",
    body: "Product teams should test their theory of change, including operational interventions, with a small group of real users early, before significant resources are committed to rolling it out in full. Testing the idea cheaply beats specifying it perfectly and being wrong expensively.",
    to: "test" as const,
  },
];

export default function Principles({ navigate }: SectionProps) {
  return (
    <div>
      <SectionHead id="principles">
        Three principles every product team should implement in their approach.
      </SectionHead>

      <Block eyebrow="The spine">
        <Prose>
          <p>
            Three fundamental principles should hold in how a product is developed. They apply whether the product is
            built in-house or by a contractor.
          </p>
        </Prose>

        <div className="mt-6 grid gap-3">
          {MOVES.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.06}>
              <button
                onClick={() => navigate(m.to)}
                className="group flex w-full items-start gap-4 rounded-xl border border-border bg-surface p-5 text-left transition-all duration-200 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-fg">
                  <m.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">{m.move}</span>
                    <Badge tone="accent">{m.framework}</Badge>
                  </span>
                  <span className="mt-1.5 block text-lg font-semibold text-fg">{m.title}</span>
                  <span className="mt-0.5 block text-sm font-medium text-accent">{m.sub}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-fg-muted">{m.body}</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </button>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block eyebrow="Design Innovation" title="A shared lens: the Double Diamond">
        <Prose className="mb-5">
          <p>
            Discovery is commonly framed through Design Innovation, the Double Diamond. It is a useful companion to the
            three principles: the first diamond is where you <strong>define the problem</strong> worth solving, and
            the second is where you <strong>test</strong> your way to the right solution. Diverge to explore, converge
            to decide.
          </p>
        </Prose>
        <Reveal>
          <DoubleDiamond compact />
        </Reveal>
      </Block>
    </div>
  );
}
