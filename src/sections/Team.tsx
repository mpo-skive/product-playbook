import { Fragment, useEffect, useState } from "react";
import { Layers3 } from "lucide-react";
import { Prose, Card, Badge } from "@/components/ui";
import { Reveal, Disclosure } from "@/components/interactive";
import { TeamExplorer } from "@/components/widgets/TeamExplorer";
import { SectionHead, Block, type SectionProps } from "./_shell";
import { cn } from "@/lib/cn";

const RACI_COLS = ["OM", "Product Manager", "UX", "Engineering", "Programme Management"];

const RACI: { phase: string; rows: [string, string, string, string, string, string][] }[] = [
  {
    phase: "Initiation",
    rows: [
      ["Engage operational stakeholders to identify and secure opportunities", "A", "R", "I", "\u2014", "\u2014"],
      ["Research to validate the problem statement and understand user needs", "I", "R", "A, R", "\u2014", "\u2014"],
      ["Define and commit to the problem statement and value metric", "A", "R", "C", "C", "\u2014"],
    ],
  },
  {
    phase: "Resourcing",
    rows: [
      ["Set up workstreams to coordinate across teams", "A", "R", "C", "C", "R"],
      ["Secure funding, headcount and vendor approvals", "A", "R", "\u2014", "\u2014", "R"],
      ["Procure tools and resources", "\u2014", "I", "\u2014", "\u2014", "A, R"],
    ],
  },
  {
    phase: "Planning",
    rows: [
      ["Define the product vision, strategy and roadmap", "C", "A, R", "C", "C", "\u2014"],
      ["Design the product to solve the problem with a good user experience", "I", "C", "A, R", "C", "\u2014"],
      ["Design robust, stable and secure architecture", "\u2014", "C", "C", "A, R", "\u2014"],
    ],
  },
  {
    phase: "Development",
    rows: [
      ["Deliver the roadmap with the engineering team", "I", "A, R", "R", "R", "R"],
      ["Build software to specification, securely and on time", "I", "I", "\u2014", "A, R", "\u2014"],
      ["Coordinate with operations teams for a smooth release", "I", "A", "\u2014", "I", "R"],
    ],
  },
  {
    phase: "Use and adoption",
    rows: [
      ["Engage end users to drive adoption", "I", "A", "R", "I", "R"],
      ["Set up dashboards to monitor metrics and derive insights", "I", "C", "I", "I", "A, R"],
      ["Support end users to resolve issues", "\u2014", "I", "I", "I", "A, R"],
    ],
  },
  {
    phase: "Governance",
    rows: [
      ["Clear audits and address findings", "A", "I", "I", "I", "R"],
      ["Ensure compliance with UX standards", "I", "\u2014", "A, R", "\u2014", "\u2014"],
      ["Ensure compliance with technical standards", "I", "\u2014", "\u2014", "A, R", "\u2014"],
    ],
  },
];

export default function Team(_: SectionProps) {
  return (
    <div>
      <SectionHead id="team">
        How a team is structured decides how fast it can move.
      </SectionHead>

      <Block eyebrow="The structure" title="One structure that grows with the product">
        <Reveal>
          <TeamExplorer />
        </Reveal>
      </Block>

      <Block eyebrow="Ops Manager" title="One accountable owner">
        <Prose>
          <p>
            The OM is the operational owner: the equivalent of a Product Owner, accountable for the outcome.
          </p>
          <p>
            The OM sits <strong>inside the Working Committee</strong> with the Leads, not in a tier of its own above
            them. The OM brings deep operational judgement and owns the levers. Each Lead brings the judgement of one
            craft: the Product Lead reads the codebase, weighs system design trade-offs, and turns intent into a
            roadmap. The OM decides.
          </p>
        </Prose>
      </Block>

      <Block eyebrow="Reference" title="Roles at a glance">
        <div className="space-y-3">
          <Disclosure summary="Steering Committee" icon={<Layers3 className="h-4 w-4" />} meta="Oversight">
            Holds the OM accountable for solving the problem. Ensures the environment lets them, vesting levers and
            clearing blockers. Makes trade-offs where other priorities have dependencies.
          </Disclosure>
          <Disclosure summary="Ops Manager (OM)" icon={<Layers3 className="h-4 w-4" />} meta="Working Committee">
            Accountable to the Steering Committee for the outcome. Sits in the Working Committee with the Leads.
            Owns the ops and tech levers. Makes trade-off decisions, defines the problem and metric, and directs the
            product at least fortnightly.
          </Disclosure>
          <Disclosure summary="Product, Tech, UX and Programme Leads" icon={<Layers3 className="h-4 w-4" />} meta="Working Committee">
            Peers in the Working Committee. Each brings the expertise of one craft to a decision and sets the standards
            for it across squads: product, engineering, UX, and the workstreams, funding and procurement that
            carry them. Each Lead is the senior form of a craft found in the squads: they set direction and standards
            across squads, while their squad counterparts run delivery within one.
          </Disclosure>
          <Disclosure summary="Programme Management" icon={<Layers3 className="h-4 w-4" />} meta="Across squads">
            Runs the programme: sets up workstreams to coordinate across teams, secures funding, headcount and vendor
            approvals, procures tools and resources, coordinates with operations teams for a smooth release, sets up
            the dashboards that monitor the metrics, supports end users to resolve issues, and clears audits. Led by a
            Programme Lead in the Working Committee.
          </Disclosure>
          <Disclosure summary="Squad" icon={<Layers3 className="h-4 w-4" />} meta="Delivery">
            Product Manager, UX, software engineers and a Programme Manager. Each squad owns a specific
            sub-problem. May be in-house or vendor-staffed. The Product Manager owns one squad's backlog; the Product
            Lead owns the roadmap across the product.
          </Disclosure>
        </div>
      </Block>


      <Block eyebrow="In DSTA" title="UX practice: UX Architects and UX Designers" id={UX_ANCHOR}>
        <UXPractice />
      </Block>

      <Block eyebrow="Accountability" title="Who does what, phase by phase">
        <Prose className="mb-4">
          <p>
            One person is accountable for each piece of work, and only one. Use this to settle arguments about who
            decides, not to hand out tasks.
          </p>
        </Prose>
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-fg-muted">
          <span><span className="font-bold text-accent">A</span> accountable, the single owner</span>
          <span><span className="font-semibold text-fg">R</span> responsible, does the work</span>
          <span><span className="font-medium">C</span> consulted before deciding</span>
          <span><span className="font-medium">I</span> informed after</span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-bg-subtle text-xs uppercase tracking-wider text-fg-subtle">
              <tr>
                <th className="px-4 py-3 font-semibold">Activity</th>
                {RACI_COLS.map((c) => (
                  <th key={c} className="px-3 py-3 text-center font-semibold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RACI.map((group) => (
                <Fragment key={group.phase}>
                  <tr className="bg-bg-muted">
                    <td colSpan={6} className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-fg-muted">
                      {group.phase}
                    </td>
                  </tr>
                  {group.rows.map(([activity, ...cells]) => (
                    <tr key={activity} className="bg-surface">
                      <td className="px-4 py-2.5 text-fg-muted">{activity}</td>
                      {cells.map((v, i) => (
                        <td
                          key={i}
                          className={cn(
                            "px-3 py-2.5 text-center text-xs",
                            v.includes("A") ? "font-bold text-accent" : v === "R" ? "font-semibold text-fg" : "text-fg-subtle",
                          )}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block eyebrow="For leaders" title="How to begin: TEAM">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["T", "Target", "Pick teams on product-critical problems that are struggling with speed, focus or flexibility."],
            ["E", "Evaluate", "Prioritise by importance to the mission and by the product's size and complexity."],
            ["A", "Assemble", "Appoint the OM and Product Lead, define the problem and metric, then stand up the squads."],
            ["M", "Mobilise", "Align stakeholders, adjust processes, and build the capabilities the team needs to decide well."],
          ].map(([l, t, d], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-fg")}>
                  {l}
                </span>
                <span>
                  <span className="text-sm font-semibold text-fg">{t}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">{d}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>
    </div>
  );
}

/* The UX practice note opens itself when something links to it, so a reader
 * arriving from the glossary lands on the content rather than a closed row. */
const UX_ANCHOR = "ux-practice-dsta";

const UX_ROLES: { title: string; label: string; lead: string; points: string[]; measures: string }[] = [
  {
    title: "UX Designer (UXD)",
    label: "Individual apps",
    lead: "Needed on every product. Sits in the squad that builds the app, from the first sketch to what ships, and stays with it as it changes.",
    points: [
      "Designs one or more apps and makes each easy to use: its flows, screens and interactions",
      "Researches with users to understand the task, and tests the design with them before it is built",
      "Works with the squad's engineers as each app is built, so what ships is what was tested",
      "Applies the shared PRIZM components and patterns, and keeps the app usable for everyone who has to use it",
    ],
    measures: "The app: whether users complete its critical tasks, how long it takes them, and where they fail or ask for help.",
  },
  {
    title: "UX Architect (UXA)",
    label: "Between apps and touchpoints",
    lead: "Needed when users must move across several apps or touchpoints to get something done. This can be one product made up of several apps, such as a super app, or one end-to-end journey that spans several apps or touchpoints.",
    points: [
      "Shapes how users find their way: where they start, how the apps are grouped and navigated, and where each task lives",
      "Designs the hand-offs between apps, so users move from one to the next without losing context",
      "Sets the patterns every app shares, such as alerts, status updates, search, forms, and using the same word for the same thing",
      "Works with the Tech Lead on build decisions users will feel: signing in once across apps, entering details once and reusing them, receiving notifications in one place and one format, and using shared PRIZM components",
    ],
    measures: "The journey across apps: whether it completes end to end, where users drop out at the hand-offs, and how often they sign in again or re-enter what the system already holds.",
  },
];

function UXPractice() {
  const [open, setOpen] = useState(false);

  // A link elsewhere in the playbook points here with ?open=<anchor>, so open
  // the note and bring it into view once the section has settled.
  useEffect(() => {
    const check = () => {
      const query = window.location.hash.split("?")[1] ?? "";
      if (!new URLSearchParams(query).getAll("open").includes(UX_ANCHOR)) return;
      setOpen(true);
      // Ends the scroll-memory restore, which would otherwise pull the page
      // back to wherever this section was last left.
      window.dispatchEvent(new Event("wheel"));
      window.setTimeout(() => {
        document.getElementById(UX_ANCHOR)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 360);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  return (
    <Disclosure
      summary="DSTA staffs UX with two roles"
      meta="UXD and UXA"
      icon={<Layers3 className="h-4 w-4" />}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {UX_ROLES.map((r) => (
          <Card key={r.title} className="flex h-full flex-col p-5">
            <Badge tone="outline">{r.label}</Badge>
            <p className="mt-2.5 text-base font-semibold text-fg">{r.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{r.lead}</p>
            <ul className="mb-4 mt-2 space-y-1.5 text-sm text-fg-muted">
              {r.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-border pt-3.5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Measures</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{r.measures}</p>
            </div>
          </Card>
        ))}
      </div>
    </Disclosure>
  );
}
