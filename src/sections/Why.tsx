import { AlertTriangle, GitBranch, Gauge, Crosshair, Repeat } from "lucide-react";
import { Card, Callout, Prose, Badge } from "@/components/ui";
import { Reveal, Disclosure } from "@/components/interactive";
import { SectionHead, Block, type SectionProps } from "./_shell";

export default function Why(_: SectionProps) {
  return (
    <div>
      <SectionHead id="why">
        Defence plans carefully, then builds to the plan. That works when the requirement is known and stable. When the
        problem keeps changing, it does not, and the work should be run as a product instead.
      </SectionHead>

      <Block eyebrow="The premise">
        <Prose>
          <p>
            Detailed upfront planning, staged approvals and fixed deliverables suit physical work: building a hangar,
            procuring a platform, fielding a well-understood system. Much of defence delivery is rightly run this way
            and should stay that way.
          </p>
          <p>
            Software behaves differently. Operational needs shift, threats adapt, and the technology underneath turns
            over quickly. Specify everything upfront and you often field a system that is out of date at launch, misses
            what operators actually needed, or demands expensive rework.
          </p>
        </Prose>
      </Block>

      <Block eyebrow="Root cause" title="Where delivery comes apart">
        <p className="mb-5 max-w-2xl text-fg-muted">
          Slow launches, slow iteration and unclear impact usually trace back to the same three issues. Expand each
          to see how it shows up.
        </p>
        <div className="space-y-3">
          <Disclosure
            icon={<GitBranch className="h-4 w-4" />}
            summary="Requirements are treated as fixed, not as a hypothesis to test"
            meta="Issue 01"
          >
            Needs are handed down as immutable requirements, and the team plans the whole product before starting
            development. Nothing validates the assumptions inside the requirement, and it is hard to adapt when
            constraints, operator feedback or the threat picture change midway.
          </Disclosure>
          <Disclosure
            icon={<Gauge className="h-4 w-4" />}
            summary="Without a clear problem, teams measure the wrong things"
            meta="Issue 02"
          >
            The engineering side tracks what it can count, such as uptime, usage and features shipped. The operational
            side tracks long-term outcomes that take years to move. Neither tells you whether the product is solving
            real problems.
          </Disclosure>
          <Disclosure
            icon={<Repeat className="h-4 w-4" />}
            summary="Decisions wait for committees, so course-correction comes too late"
            meta="Issue 03"
          >
            Trade-offs between operations and technology escalate to committees where everyone is represented. They meet
            infrequently and decide by consensus. By the time the outcome is visible, it is too late to change course.
          </Disclosure>
        </div>
      </Block>

      <Block eyebrow="The shift" title="Strengthening Ops-Tech Integration">
        <Prose className="mb-6">
          <p>
            The fix is not more process. Operations and technology should be integrated from the start and aimed at a
            single outcome, with one person accountable for reaching it. We call this{" "}
            <strong>Ops-Tech Integration (OTI)</strong>. Operational judgement sits with the Ops Manager, who owns that
            outcome.
          </p>
        </Prose>

        <div className="grid gap-3 sm:grid-cols-2">
          <Reveal>
            <Card className="h-full p-5">
              <Badge tone="danger">Before</Badge>
              <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                <li>Ops sets fixed requirements, then hands off to tech</li>
                <li>Tech builds to spec, measuring delivery not outcome</li>
                <li>Committees arbitrate, slowly</li>
                <li>Impact surfaces too late to act on</li>
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.06}>
            <Card className="h-full p-5" accent>
              <Badge tone="accent">After</Badge>
              <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                <li>One team owns the problem and the metric</li>
                <li>Ops and tech iterate together quickly</li>
                <li>Solutions are tested with real users early</li>
                <li>The team pivots the moment evidence says so</li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Block>

      <Block eyebrow="When to use this" title="Best for problems that keep changing">
        <p className="mb-5 max-w-2xl text-fg-muted">
          A product approach helps most when the problem or the solution is still unclear. Reach for it when any of
          these are true.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <UseCase icon={Crosshair} title="Evolving problems">
            The need keeps changing, for example as operator expectations or the operating picture shift.
          </UseCase>
          <UseCase icon={GitBranch} title="Unclear root cause">
            A new problem where you are not yet sure what is actually driving it.
          </UseCase>
          <UseCase icon={Gauge} title="Unproven solution">
            You cannot be certain the approach will achieve the intended effect until you try it.
          </UseCase>
        </div>
      </Block>

      <Callout tone="info" title="A defence example" icon={<AlertTriangle className="h-4 w-4" />}>
        <p>
          A C2 product supporting an integrated kill chain cannot be fully specified upfront. Operators
          discover what decision support they need only by using it against realistic scenarios. That is a
          product-critical problem: it needs quick, continuous iteration.
        </p>
      </Callout>
    </div>
  );
}

function UseCase({ icon: Icon, title, children }: { icon: typeof Crosshair; title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-subtle text-accent">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="text-sm font-semibold text-fg">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{children}</p>
    </Card>
  );
}
