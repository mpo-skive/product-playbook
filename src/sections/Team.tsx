import { Fragment } from "react";
import { Crosshair, Scale, Layers3, UserCheck } from "lucide-react";
import { Callout, Prose, Card, Badge } from "@/components/ui";
import { Reveal, Disclosure, Tabs } from "@/components/interactive";
import { TeamExplorer } from "@/components/widgets/TeamExplorer";
import { SectionHead, Block, type SectionProps } from "./_shell";
import { cn } from "@/lib/cn";

const RACI_COLS = ["OM", "Product Manager", "Design", "Engineering", "Programme Management"];

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
      ["Ensure compliance with design standards", "I", "\u2014", "A, R", "\u2014", "\u2014"],
      ["Ensure compliance with technical standards", "I", "\u2014", "\u2014", "A, R", "\u2014"],
    ],
  },
];

export default function Team(_: SectionProps) {
  return (
    <div>
      <SectionHead id="team">
        How a team is structured decides how fast it can move. This principle puts one accountable owner on the
        problem, surrounds them with just enough expertise and levers, and empowers the team to solve it. It rests on
        three rules, and the shape scales with complexity.
      </SectionHead>

      <Block eyebrow="Ground rules" title="Three rules, before any org chart">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: UserCheck, t: "Single-line accountability", d: "One person is accountable for moving the metric. Not a committee, not a consensus." },
            { icon: Scale, t: "Levers, not just requirements", d: "The team holds the ops and tech levers to make trade-offs itself, rather than implementing orders." },
            { icon: Crosshair, t: "Empowered to solve", d: "It can change the operational approach, the technology, or both, to solve the underlying problem." },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <Card className="h-full p-5">
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                  <p.icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-sm font-semibold text-fg">{p.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{p.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block eyebrow="The structure" title="One structure that grows with the product">
        <Prose className="mb-5">
          <p>
            The same shape serves a two-week proof of concept and full scale development. A Steering Committee
            oversees the problem. Below it, the Working Committee runs the product: the OM and Product Lead sit inside
            it in a two-in-a-box, alongside the Leads. What changes with scale is how many tiers are present. Switch
            the scale below to see the structure expand and contract.
          </p>
        </Prose>
        <Reveal>
          <TeamExplorer />
        </Reveal>
      </Block>

      <Block eyebrow="Ops Manager" title="One accountable owner, two-in-a-box with a Product Lead">
        <Prose>
          <p>
            The accountable owner is often called a Business Owner, sometimes paired with a separate policy lead. To keep
            accountability single, we <strong>fold that remit into the Ops Manager</strong> rather than split it out. The
            OM is the operational owner: the equivalent of a Product Owner, accountable for the outcome.
          </p>
          <p>
            The OM sits <strong>two-in-a-box with a Product Lead</strong>. The OM brings deep operational judgement and
            owns the levers. The Product Lead brings product and engineering expertise: able to read the codebase,
            weigh system design trade-offs, and turn intent into a roadmap. Together they make joint decisions. It is a
            partnership of equals, not a reporting line. The pair sits inside the Working Committee, not in a tier of its
            own above it.
          </p>
        </Prose>
        <Callout tone="accent" title="When one is enough">
          <p>
            Where the problem does not need distinct operational and product judgement held by two people, a capable
            OM who also carries product depth can own it alone. The two-in-a-box is also a useful transition: an OM
            builds product fluency alongside a Product Lead, then takes sole ownership once ready.
          </p>
        </Callout>
      </Block>

      <Block eyebrow="Lead or Manager" title="The same craft at different seniority">
        <Prose className="mb-5">
          <p>
            Lead and Manager are not different jobs. They are the same craft at different seniority, and this holds for
            every craft in the team. A Lead sits in the Working Committee, sets direction and standards across squads,
            and makes the hard trade-offs. A Manager runs delivery inside a squad. Whether you need both tiers depends
            on the product's scale and complexity.
          </p>
        </Prose>
        <Tabs
          tabs={[
            {
              id: "product",
              label: "Product",
              content: <LeadManager lead={["Product Lead", "Owns vision, strategy and roadmap across the product", "Sits in the Working Committee", "Partners the OM in the two-in-a-box"]} manager={["Product Manager", "Owns the backlog and delivery of one squad", "Runs discovery and prioritisation day to day", "Reports into the Product Lead where one exists"]} />,
            },
            {
              id: "eng",
              label: "Engineering",
              content: <LeadManager lead={["Tech Lead", "Owns architecture and technical standards across squads", "Sits in the Working Committee", "Makes system design trade-offs"]} manager={["Engineering Manager", "Owns the engineering delivery of one squad", "Runs the team's technical execution", "Reports into the Tech Lead where one exists"]} />,
            },
            {
              id: "design",
              label: "Design",
              content: <LeadManager lead={["Design Lead", "Owns the experience and design standards across the product", "Sits in the Working Committee", "Leads research that validates the problem"]} manager={["Designer", "Owns the design work of one squad", "Runs research and design day to day", "Reports into the Design Lead where one exists"]} />,
            },
            {
              id: "programme",
              label: "Programme",
              content: <LeadManager lead={["Programme Lead", "Sets up the workstreams that coordinate across teams", "Sits in the Working Committee", "Secures funding, headcount and vendor approvals"]} manager={["Programme Manager", "Owns the programme management of one workstream", "Procures tools and resources, and sets up the dashboards that monitor the metrics", "Reports into the Programme Lead where one exists"]} managerScope="per workstream" />,
            },
          ]}
        />
        <Callout tone="info" title="A rule of thumb">
          <p>
            Early on a product may have only Managers, who also carry the Lead responsibilities. As it grows into
            multiple squads, Leads appear to hold the line on strategy and standards across them.
          </p>
        </Callout>
      </Block>

      <Block eyebrow="Reference" title="Roles at a glance">
        <div className="space-y-3">
          <Disclosure summary="Steering Committee" icon={<Layers3 className="h-4 w-4" />} meta="Oversight">
            Holds the OM accountable for solving the problem. Ensures the environment lets them, vesting levers and
            clearing blockers. Makes trade-offs where other priorities have dependencies.
          </Disclosure>
          <Disclosure summary="Ops Manager (OM)" icon={<Layers3 className="h-4 w-4" />} meta="Working Committee">
            Accountable to the Steering Committee for the outcome. Sits in the Working Committee, in a two-in-a-box
            with the Product Lead. Owns the ops and tech levers. Makes trade-off decisions, defines
            the problem and metric, and directs the product at least fortnightly.
          </Disclosure>
          <Disclosure summary="Product, Tech, Design and Programme Leads" icon={<Layers3 className="h-4 w-4" />} meta="Working Committee">
            Peers in the Working Committee. Each brings the expertise of one craft to a decision and sets the standards
            for it across squads: product, engineering, design, and the workstreams, funding and procurement that
            carry them. The Product Lead partners the OM in the two-in-a-box.
          </Disclosure>
          <Disclosure summary="Programme Management" icon={<Layers3 className="h-4 w-4" />} meta="Across squads">
            Runs the programme: sets up workstreams to coordinate across teams, secures funding, headcount and vendor
            approvals, procures tools and resources, coordinates with operations teams for a smooth release, sets up
            the dashboards that monitor the metrics, supports end users to resolve issues, and clears audits. Led by a
            Programme Lead in the Working Committee.
          </Disclosure>
          <Disclosure summary="Squad" icon={<Layers3 className="h-4 w-4" />} meta="Delivery">
            Product Manager, Engineering Manager, Designer and software engineers. Each squad owns a specific
            sub-problem. May be in-house or vendor-staffed.
          </Disclosure>
        </div>
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

function LeadManager({ lead, manager, managerScope = "in-squad" }: { lead: string[]; manager: string[]; managerScope?: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        { role: lead, tag: "Lead", tone: "accent" as const },
        { role: manager, tag: "Manager", tone: "neutral" as const },
      ].map(({ role, tag, tone }) => (
        <Card key={tag} className={cn("p-5", tone === "accent" && "border-l-4 border-l-accent")}>
          <Badge tone={tone === "accent" ? "accent" : "outline"}>{tag === "Lead" ? "Lead · more senior" : `Manager · ${managerScope}`}</Badge>
          <p className="mt-2.5 text-base font-semibold text-fg">{role[0]}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
            {role.slice(1).map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {r}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
