import { useState } from "react";
import { Search } from "lucide-react";
import { Prose, Card, Badge } from "@/components/ui";
import { SectionHead, Block, type SectionProps } from "./_shell";

/* A third entry links the term to the place in the playbook that explains it.
 * Hash routing keeps the section in the path, so the target is carried as a
 * query the destination reads, not as a bare fragment. */
const TERMS: [string, string, string?][] = [
  ["4C", "The test of a good problem statement: Clarity, Consequence, Cause, Confirmation."],
  ["6W", "The six questions a problem statement should answer: what, where, when, who, why it happens, why it matters."],
  ["C2", "Command and control."],
  ["CLARA", "DSTA's AI product-intelligence tool, the hub for the prompt library."],
  ["DASH", "DSTA's measurement platform for UX, product and capability metrics."],
  ["DSTA", "Defence Science and Technology Agency."],
  ["Fitness assessment", "A five-dimension score of how fit for purpose a product is."],
  ["Flywheel", "The ProductOps operating loop: Research, then Design and Test."],
  ["FSD", "Full scale development. Building the product out at scale once its value is proven."],
  ["IMPACT", "The modernisation framework: Identify, Map, Phase, Assemble teams, Change management, Top-level ownership."],
  ["Leading indicator", "An early behaviour change that validates part of the theory of change."],
  ["METRIC", "The value framework: Map, Establish, Track, Review, Institutionalise, Commit."],
  ["MPO", "MINDEF Product Office."],
  ["North Star metric", "Another name for the value metric."],
  ["OM", "Ops Manager. The accountable operational owner of a product's outcome."],
  ["OTI", "Ops-Tech Integration. Operations and technology aimed at one outcome."],
  ["PRIZM", "DSTA's AI-ingestible design system. This playbook is built on it."],
  ["Product Lead", "The senior product role in the Working Committee; partners the OM two-in-a-box."],
  ["Product Manager", "The product role running delivery inside a squad."],
  ["Programme Lead", "The senior programme role in the Working Committee; a peer of the Product, Tech and UX Leads."],
  ["Programme Management", "The function that coordinates delivery across the squads of a product: workstreams, funding, procurement, dashboards and user support."],
  ["Programme Manager", "The programme role running procurement, dashboards and user support for one workstream."],
  ["ProductOps Pipeline (enterprise)", "DSTA's organisation-wide product capability, standards and toolchain."],
  ["Proof of concept (PoC)", "The first stage: proving the thing can be built and put in front of real users."],
  ["Proof of value (PoV)", "The second stage: proving the value metric can actually move."],
  ["RACI", "Who is Responsible, Accountable, Consulted and Informed for each activity in a product team."],
  ["SFR", "The prioritisation test for problem statements: Severity, Frequency, Reach, each scored low, medium or high."],
  ["Squad", "The delivery team: PM, Engineering Manager, UX and engineers."],
  ["SMART", "The test of a value metric: specific, measurable, achievable, relevant, time-bound."],
  ["Steering Committee", "The oversight body that holds the OM accountable, vests the levers and clears blockers."],
  ["Strangler fig", "A gradual modernisation strategy that replaces a system piece by piece."],
  ["TEAM", "The team principle, and the first-steps mnemonic: Target, Evaluate, Assemble, Mobilise."],
  ["TEST", "The testing framework: Trial with real operators, Expose the riskiest assumption, Shorten the loop, Turn tests into decisions."],
  ["Theory of change", "The causal chain from what you build to the outcome you seek."],
  ["Two-in-a-box", "The joint OM and Product Lead ownership pairing."],
  [
    "UX Architect (UXA)",
    "In DSTA, the UX role that designs between apps: how users move across several apps or touchpoints, and the patterns they share; works with the Tech Lead.",
    "ux-practice-dsta",
  ],
  ["Value metric", "A leading indicator that directly measures the outcome of solving the problem."],
  ["Value-Cost Ratio", "Outcome delivered per dollar spent; its year-on-year change is the key signal."],
  ["Working Committee", "The body that runs the product: the OM and Product Lead two-in-a-box, plus the Leads."],
];

export default function Glossary({ navigate }: SectionProps) {
  const [q, setQ] = useState("");
  const filtered = TERMS.filter(([t, d]) => (t + d).toLowerCase().includes(q.toLowerCase()));

  function open(anchor: string) {
    navigate("team");
    window.location.hash = `/team?open=${anchor}`;
  }

  return (
    <div>
      <SectionHead id="glossary">
        The language of this playbook, in plain terms.
      </SectionHead>

      <Block eyebrow="A to Z" title="Glossary">
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms"
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
          />
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {filtered.map(([t, d, anchor]) => (
            <div key={t} className="rounded-lg border border-border bg-surface p-3.5">
              {anchor ? (
                <a
                  href={`#${anchor}`}
                  onClick={(e) => {
                    e.preventDefault();
                    open(anchor);
                  }}
                  className="text-sm font-semibold text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  {t}
                </a>
              ) : (
                <p className="text-sm font-semibold text-fg">{t}</p>
              )}
              <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{d}</p>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-sm text-fg-subtle">No terms match &ldquo;{q}&rdquo;.</p>}
        </div>
      </Block>

      <Block eyebrow="About" title="About this playbook">
        <Prose className="mb-4">
          <p>
            A practical guide to product ways of working, written for the defence ecosystem. The Tools section draws on
            DSTA's ProductOps Co-pilot, and the whole site is built on the PRIZM 4.0 Enterprise design system.
          </p>
        </Prose>
        <div className="flex flex-wrap gap-2">
          {["DSTA ProductOps Co-pilot", "PRIZM 4.0 Enterprise"].map((s) => (
            <Badge key={s} tone="outline">{s}</Badge>
          ))}
        </div>
        <Card className="mt-6 p-5">
          <p className="text-sm font-semibold text-fg">Jointly developed by MINDEF and DSTA</p>
          <p className="mt-1 text-sm text-fg-muted">Co-authored by Tan Min Min (MPO) and Alvin Loh (DSTA).</p>
        </Card>
      </Block>
    </div>
  );
}
