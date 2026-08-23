import { Search, Map, Layers, Users, RefreshCw, Crown, GitCommitHorizontal, AlertTriangle } from "lucide-react";
import { Callout, Prose, Card, Badge } from "@/components/ui";
import { Reveal, Disclosure, Tabs } from "@/components/interactive";
import { FitnessAssessment } from "@/components/widgets/FitnessAssessment";
import { SectionHead, Block, type SectionProps } from "./_shell";

const IMPACT = [
  { letter: "I", name: "Identify", icon: Search, text: "Stock-take every product, score how outdated each is, and prioritise by fitness and mission criticality." },
  { letter: "M", name: "Map", icon: Map, text: "Map where the product is today and where it needs to be, aligning ops and tech on the gap and the dependencies." },
  { letter: "P", name: "Phase", icon: Layers, text: "Break the work into phases that de-risk delivery and hand operators early wins." },
  { letter: "A", name: "Assemble teams", icon: Users, text: "Stand up a team with single-threaded accountability and the levers to decide, following the TEAM move." },
  { letter: "C", name: "Change management", icon: RefreshCw, text: "Prepare, manage and sustain the human side, so the new product is adopted, not just deployed." },
  { letter: "T", name: "Top-level ownership", icon: Crown, text: "Treat modernisation as a command responsibility owned at the top, where the hard trade-offs are made." },
];

export default function Modernise(_: SectionProps) {
  return (
    <div>
      <SectionHead id="modernise">
        Most defence software already exists. Replacing it in one go is the tempting move and the wrong one, because
        operations cannot stop while you rebuild. Modernise in phases, prove each phase before starting the next, and
        retire the old system only once the new one has taken over its work. It follows the IMPACT framework.
      </SectionHead>

      <Block eyebrow="First, a definition" title="Outdated is not the same as old">
        <Prose>
          <p>
            A product is not outdated because of its age. It is outdated when it stops being fit for purpose on any of
            three fronts: <strong>business fitness</strong>, it no longer solves the real problem;{" "}
            <strong>technical fitness</strong>, it is no longer secure or reliable; or <strong>cost fitness</strong>,
            it costs more than the value it returns. A decade-old system that still serves operators well is not a
            modernisation candidate.
          </p>
        </Prose>
      </Block>

      <Block eyebrow="Identify" title="Assess fitness, then prioritise">
        <Prose className="mb-5">
          <p>
            Score each product across five dimensions, and weigh that against how mission-critical it is. The two
            together tell you what to modernise first. Try it below.
          </p>
        </Prose>
        <Reveal>
          <FitnessAssessment />
        </Reveal>
      </Block>

      <Block eyebrow="Framework" title="IMPACT: six steps to modernise without a big bang">
        <div className="grid gap-3 sm:grid-cols-2">
          {IMPACT.map((m, i) => (
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

      <Block eyebrow="Phase" title="Why never a big bang">
        <Prose className="mb-5">
          <p>
            Replacing an entire system at once means any failure hits every user and every function at the same time,
            with nowhere to roll back to. Phasing contains the blast radius, delivers value sooner, and lets each phase
            teach the next.
          </p>
        </Prose>
        <Tabs
          tabs={[
            {
              id: "bigbang",
              label: "Big bang",
              content: (
                <Card className="p-5">
                  <Badge tone="danger">Higher risk</Badge>
                  <ul className="mt-3 space-y-2 text-sm text-fg-muted">
                    <li>One cutover, one moment of maximum exposure</li>
                    <li>A failure affects all users and functions at once</li>
                    <li>No safe rollback point</li>
                    <li>Value arrives only at the very end, if at all</li>
                  </ul>
                </Card>
              ),
            },
            {
              id: "strangler",
              label: "Strangler fig",
              content: (
                <Card className="p-5" accent>
                  <Badge tone="accent">Recommended</Badge>
                  <p className="mt-3 text-sm text-fg-muted">
                    Build the new system around the old one. New components intercept and handle requests piece by
                    piece, slowly taking over until the legacy system can be retired safely. Operations never stop.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1">
                    {["Legacy carries all", "New handles slice 1", "New handles most", "Legacy retired"].map((s, i) => (
                      <div key={s} className="flex shrink-0 items-center gap-1.5">
                        {i > 0 && <GitCommitHorizontal className="h-3.5 w-3.5 text-fg-subtle" />}
                        <span className="rounded-md bg-bg-muted px-2.5 py-1 text-xs font-medium text-fg">{s}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ),
            },
          ]}
        />
      </Block>

      <Block eyebrow="Change management" title="Prepare, manage, sustain">
        <div className="space-y-3">
          <Disclosure summary="Prepare" meta="Foundation" defaultOpen>
            Capture how the current product really works, the knowledge as well as the features, in a central
            repository. Engage the four user groups early: operational owners, ops users, the technical team and end
            users. Design for better outcomes, not feature parity.
          </Disclosure>
          <Disclosure summary="Manage" meta="Execution">
            Communicate through every stage, before, during and after each deployment. Build shared skills through joint
            training, and secure proper knowledge transfer from any outgoing vendor.
          </Disclosure>
          <Disclosure summary="Sustain" meta="Adoption">
            Track adoption and satisfaction, update the standard operating procedures, and keep a continuous improvement
            cycle running so the product stays relevant.
          </Disclosure>
        </div>
        <Callout tone="accent" title="Modernise the work, not just the tech">
          <p>
            The biggest trap is rebuilding the old process in new technology. Modernisation is a chance to simplify how
            work is done. Ask whether a feature should be replicated at all before you port it.
          </p>
        </Callout>
      </Block>

      <Callout tone="info" title="Top-level ownership" icon={<AlertTriangle className="h-4 w-4" />}>
        <p>
          Modernisation reshapes capabilities and forces hard trade-offs on resourcing, build-versus-buy and
          organisational design. That makes it a <strong>command responsibility</strong>. The Head of the organisation
          is accountable for the outcome. The work can be delegated, but the accountability cannot.
        </p>
      </Callout>
    </div>
  );
}
