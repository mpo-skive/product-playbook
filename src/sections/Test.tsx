import { FlaskConical, Timer, Users, Gauge, ShieldAlert, Rocket } from "lucide-react";
import { Callout, Prose, Card, Badge } from "@/components/ui";
import { Reveal, Disclosure } from "@/components/interactive";
import { DoubleDiamond } from "@/components/widgets/DoubleDiamond";
import { SectionHead, Block, type SectionProps } from "./_shell";

const TEST = [
  { letter: "T", name: "Trial with real operators", icon: Users, text: "Test with the operators who will actually use it, not internal stand-ins. A watchkeeper's judgement cannot be simulated by the project team." },
  { letter: "E", name: "Expose the riskiest assumption", icon: FlaskConical, text: "A prototype exists to be wrong quickly. Build the least you can to test the assumption most likely to sink the product, then throw it away." },
  { letter: "S", name: "Shorten the loop", icon: Timer, text: "Measure the time from user feedback to a changed prototype in days, not months. If it is slow, fixing that comes first." },
  { letter: "T", name: "Turn tests into decisions", icon: Gauge, text: "Every test should end in one of three calls: keep it, change it, or drop it. A test that ends without one has taught the team nothing." },
];

export default function Test(_: SectionProps) {
  return (
    <div>
      <SectionHead id="test">
        A requirement is a hypothesis until an operator has used it. This principle tests the theory of change cheaply
        and early, so the expensive build is committed only to ideas that have already earned it. It follows the TEST
        framework.
      </SectionHead>

      <Block eyebrow="The idea">
        <Prose>
          <p>
            Every product rests on a theory of change: if we build this, operators will behave differently, and that
            shift will move the outcome. Each link in that chain is an assumption. Testing is how a team finds the
            broken link before a system has been built around it.
          </p>
          <p>
            The cost of being wrong compounds the later you learn. A flawed assumption caught in a two-day prototype is
            a lesson. The same assumption caught after fielding is a rebuild. Test early, and test with the people who
            will actually use it.
          </p>
        </Prose>
      </Block>

      <Block eyebrow="Design Innovation" title="Two diamonds: the right problem, then the right solution">
        <Prose className="mb-5">
          <p>
            Design Innovation, the Double Diamond, gives testing its shape. You diverge to explore, then converge to
            decide, twice. The first diamond makes sure you are solving the right problem. The second makes sure you
            have the right solution. Testing lives across both, but bites hardest in the second.
          </p>
        </Prose>
        <Reveal>
          <DoubleDiamond />
        </Reveal>
      </Block>

      <Block eyebrow="Framework" title="TEST: four habits of teams that learn fast">
        <div className="grid gap-3 sm:grid-cols-2">
          {TEST.map((m, i) => (
            <Reveal key={m.name} delay={Math.min(i * 0.04, 0.2)}>
              <Card className="flex h-full items-start gap-3.5 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-base font-bold text-accent-fg">
                  {m.letter}
                </span>
                <span>
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-fg">{m.name}</span>
                    <m.icon className="h-3.5 w-3.5 text-fg-subtle" />
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">{m.text}</span>
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block eyebrow="Benchmarks" title="How fast is fast enough">
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="p-5" accent>
            <div className="mb-2 flex items-center gap-2">
              <Rocket className="h-4.5 w-4.5 text-accent" />
              <Badge tone="accent">Proof of concept</Badge>
            </div>
            <p className="text-2xl font-semibold text-fg">3 to 6 months</p>
            <p className="mt-1 text-sm text-fg-muted">to put something in front of real users for the first time.</p>
          </Card>
          <Card className="p-5" accent>
            <div className="mb-2 flex items-center gap-2">
              <Rocket className="h-4.5 w-4.5 text-accent" />
              <Badge tone="accent">Proof of value</Badge>
            </div>
            <p className="text-2xl font-semibold text-fg">Within 1 year</p>
            <p className="mt-1 text-sm text-fg-muted">to launch to real users and show the metric can move.</p>
          </Card>
        </div>
        <p className="mt-3 text-sm text-fg-muted">
          These are reference points, not targets to game. If a team cannot reach them, the useful question is what is
          blocking it: access to users, procurement, funding, or the team's own structure.
        </p>
      </Block>

      <Block eyebrow="Enable it" title="What leaders must clear out of the way">
        <div className="space-y-3">
          <Disclosure summary="Direct access to real users" meta="Blocker">
            Teams cannot test what they cannot reach. Give the OM a route to actual operators, and the autonomy to
            manage the optics of testing an unfinished thing with a small sample.
          </Disclosure>
          <Disclosure summary="Permission to build a rough prototype fast" meta="Blocker">
            Adjust finance and procurement so a team can hack a testable version within weeks, not wait a budget cycle.
            A good benchmark is a launchable prototype for a proof of concept inside three to six months.
          </Disclosure>
          <Disclosure summary="Room to be wrong" meta="Blocker">
            If every test must succeed, teams stop testing anything risky. Judge teams on how much they learn and how
            fast they adjust, not on a run of flawless demos.
          </Disclosure>
        </div>
      </Block>

      <Callout tone="warning" title="Guardrails still apply" icon={<ShieldAlert className="h-4 w-4" />}>
        <p>
          Fast iteration does not mean loose assurance. Teams should track resilience and security as guardrail metrics
          alongside the value metric, and escalate any trade-off that carries real risk to the Steering Committee.
        </p>
      </Callout>
    </div>
  );
}
