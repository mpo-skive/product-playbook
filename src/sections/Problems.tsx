import { Map, Crosshair, LineChart, RefreshCw, Layers, CheckCircle2, ListChecks } from "lucide-react";
import { Callout, Prose, Card, Badge } from "@/components/ui";
import { Reveal, Disclosure } from "@/components/interactive";
import { FourCScorer } from "@/components/widgets/FourCScorer";
import { MetricLadder } from "@/components/widgets/MetricLadder";
import { VCRCalculator } from "@/components/widgets/VCRCalculator";
import { SectionHead, Block, type SectionProps } from "./_shell";

const METRIC = [
  { letter: "M", name: "Map", icon: Map, text: "Map organisational priorities to specific problems, then break them into sub-problems with clear hypotheses." },
  { letter: "E", name: "Establish", icon: Crosshair, text: "Establish a sharp problem statement for each product, using the 4C check." },
  { letter: "T", name: "Track", icon: LineChart, text: "Track performance with a value metric, a baseline and a regular reporting cadence." },
  { letter: "R", name: "Review", icon: RefreshCw, text: "Review and realign when the metric is not moving as projected. Diagnose why, then act." },
  { letter: "I", name: "Institutionalise", icon: Layers, text: "Institutionalise learnings across the portfolio through shared insight and dashboards." },
  { letter: "C", name: "Commit", icon: CheckCircle2, text: "Commit to regular reviews with senior leaders that hold teams to improvement, not activity." },
];

const SIX_W: [string, string][] = [
  ["What", "The thing that is going wrong. Describe the problem, not the solution you have in mind."],
  ["Where", "Where the problem happens: the place, the unit, or the step in the process."],
  ["When", "The point at which it happens, and how often."],
  ["Who", "The people who feel it. Name the group, and what it costs them."],
  ["Why it happens", "The real cause underneath, not just the symptom you can see."],
  ["Why it matters", "What keeps going wrong if nobody fixes it."],
];

const SFR = [
  { letter: "S", name: "Severity", text: "How painful it is for the user when it happens." },
  { letter: "F", name: "Frequency", text: "How often it happens." },
  { letter: "R", name: "Reach", text: "How many users it affects." },
];

export default function Problems(_: SectionProps) {
  return (
    <div>
      <SectionHead id="problems">
        Two things make a product worth building: it solves a real problem, and you can measure whether that problem is
        getting smaller. This principle covers how to choose the right problem, write it down clearly, and pick a
        measure that shows whether it is working. It follows the METRIC framework.
      </SectionHead>

      <Block eyebrow="Framework" title="METRIC: the six steps from problem to proof">
        <div className="grid gap-3 sm:grid-cols-2">
          {METRIC.map((m, i) => (
            <Reveal key={m.name} delay={Math.min(i * 0.04, 0.2)}>
              <Card className="flex h-full items-start gap-3.5 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-base font-bold text-accent-fg">
                  {m.letter}
                </span>
                <span>
                  <span className="text-sm font-semibold text-fg">{m.name}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">{m.text}</span>
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block eyebrow="Establish" title="Write a problem worth solving">
        <Prose className="mb-5">
          <p>
            Most weak products trace back to a weak problem statement: an aspiration, a solution in disguise, or a
            system simply reaching end of life. Build the statement by answering the <strong>6W</strong>, then test what
            you have written against the <strong>4C</strong> check.
          </p>
        </Prose>

        <div className="mb-6 overflow-hidden rounded-xl border border-border">
          <dl className="divide-y divide-border">
            {SIX_W.map(([q, d]) => (
              <div key={q} className="grid gap-0.5 bg-surface px-4 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-accent">{q}</dt>
                <dd className="text-sm leading-relaxed text-fg-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mb-3 text-sm text-fg-muted">
          Load the weak example, then the improved one. The improved statement shows where each of the 6W sits.
        </p>
        <Reveal>
          <FourCScorer />
        </Reveal>

        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-fg-muted">Four traps to avoid</p>
          <Disclosure summary="The aspiration" meta="Trap">
            Describes a desired end state, not a problem someone faces today. &ldquo;We want a decision-ready force.&rdquo;
            Ask instead: who is stuck, doing what, at what cost?
          </Disclosure>
          <Disclosure summary="The solution in disguise" meta="Trap">
            &ldquo;We need a new data platform.&rdquo; This assumes the answer. State what decision cannot be made today,
            and why, before naming any system.
          </Disclosure>
          <Disclosure summary="The end-of-life notice" meta="Trap">
            &ldquo;The system is out of support.&rdquo; Age is not a problem. Name the user function that will lose a
            viable alternative, and what that costs operations.
          </Disclosure>
          <Disclosure summary="The vague pain" meta="Trap">
            &ldquo;Users find it slow and clunky.&rdquo; Without a specific user, task, frequency and severity, no team
            can tell whether they have fixed it.
          </Disclosure>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm font-medium text-fg-muted">Choosing between problem statements: SFR</p>
          <p className="mt-1.5 max-w-2xl text-sm text-fg-muted">
            You will usually have more problem statements than teams to work on them. Score each one low, medium or
            high on three counts, and start with the problems that score high on all three.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {SFR.map((x, i) => (
              <Reveal key={x.name} delay={i * 0.05}>
                <Card className="flex h-full items-start gap-3.5 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-base font-bold text-accent-fg">
                    {x.letter}
                  </span>
                  <span>
                    <span className="text-sm font-semibold text-fg">{x.name}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">{x.text}</span>
                  </span>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-sm text-fg-muted">
            Hold back the ones that score high on only one or two. A severe problem that hits a handful of users once a
            year is a worse first bet than one that is severe, frequent and widespread.
          </p>
        </div>
      </Block>

      <Block eyebrow="Track" title="Climb the metric ladder">
        <Prose className="mb-5">
          <p>
            Teams default to counting what is easy: logins, uptime, features shipped. Those are inputs, and they say
            nothing about whether the problem is getting smaller. Aim for the <strong>value metric</strong>, the third
            rung. It is your <strong>North Star</strong>: it measures the outcome of solving your problem and still
            moves often enough to steer by. It should also act as a leading indicator of the outcome metric above it,
            the effect the organisation is ultimately chasing, which moves far too slowly to guide a team week to week.
            You should be able to explain how improving one will improve the other. Click each rung.
          </p>
        </Prose>
        <Reveal>
          <MetricLadder />
        </Reveal>

        <Callout tone="warning" title="Reject a candidate metric if" icon={<ListChecks className="h-4 w-4" />}>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>It can be gamed without the outcome improving.</li>
            <li>Too much sits between it and the outcome for a movement to mean anything.</li>
            <li>The link to the outcome rests on assumption rather than evidence.</li>
            <li>It measures what the system does, not what changes for the user.</li>
            <li>It is subjective or self-reported.</li>
          </ul>
          <p className="mt-3">
            Pressure-test whatever survives against SMART: specific, measurable, achievable, relevant, time-bound.
          </p>
        </Callout>
      </Block>

      <Block eyebrow="Review" title="When the metric stops improving">
        <p className="mb-4 max-w-2xl text-fg-muted">
          A metric that stops improving does not mean the team has failed. But something is holding it back, and the
          team needs to know what. Work out which of these is happening before you change the plan.
        </p>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-subtle text-xs uppercase tracking-wider text-fg-subtle">
              <tr>
                <th className="px-4 py-3 font-semibold">Likely cause</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">How you can tell</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Not addressing the root cause", "Users adopt it, but the problem persists", "Revisit the problem statement"],
                ["A false assumption", "Research reveals an assumption was wrong", "Pivot the approach"],
                ["Problem has changed", "Evidence shows it shrank or shifted", "Redefine or deprioritise"],
                ["Blocked outside the team", "The team is waiting on an approval, a decision or access it cannot grant itself", "Escalate to the Steering Committee"],
                ["Team cannot move fast", "Active but slow or unfocused", "Review structure and skills"],
              ].map((row) => (
                <tr key={row[0]} className="bg-surface">
                  <td className="px-4 py-3 font-medium text-fg">{row[0]}</td>
                  <td className="hidden px-4 py-3 text-fg-muted sm:table-cell">{row[1]}</td>
                  <td className="px-4 py-3 text-fg-muted">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>
      <Block eyebrow="Commit" title="Prove it is worth the spend">
        <Prose className="mb-5">
          <p>
            Value must be weighed against cost. The <strong>Value-Cost Ratio</strong> tells you how much outcome you buy
            per dollar, and the year-on-year change is the signal that matters. Improve it either by growing value at
            steady cost, or by shifting a product to maintenance once its value has plateaued.
          </p>
        </Prose>
        <Reveal>
          <VCRCalculator />
        </Reveal>
        <p className="mt-3 text-xs text-fg-subtle">
          Figures are illustrative and do not represent any real platform.
        </p>
      </Block>

      <div className="mt-8 flex flex-wrap gap-2">
        <Badge tone="outline">6W: what, where, when, who, why it happens, why it matters</Badge>
        <Badge tone="outline">4C: clarity, consequence, cause, confirmation</Badge>
        <Badge tone="outline">SFR: severity, frequency, reach</Badge>
        <Badge tone="outline">SMART value metrics</Badge>
        <Badge tone="outline">VCR and unit cost</Badge>
      </div>

    </div>
  );
}
