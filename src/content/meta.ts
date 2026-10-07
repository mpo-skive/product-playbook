import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Flame,
  Layers,
  Target,
  Users,
  FlaskConical,
  RefreshCw,
  Gavel,
  Wrench,
  Rocket,
  BookMarked,
} from "lucide-react";

export type SectionId =
  | "home"
  | "why"
  | "principles"
  | "problems"
  | "team"
  | "test"
  | "modernise"
  | "govern"
  | "tools"
  | "start"
  | "glossary";

export type PersonaId = "leader" | "om" | "practitioner";
export type Craft = "product" | "engineering" | "ux";

export interface SectionMeta {
  id: SectionId;
  label: string; // short nav label
  title: string; // full title
  kicker?: string;
  icon: LucideIcon;
  readMins: number;
  blurb: string;
  framework?: string; // mnemonic badge, e.g. METRIC
}

export const SECTIONS: SectionMeta[] = [
  {
    id: "home",
    label: "Start here",
    title: "The Defence Product Playbook",
    icon: Compass,
    readMins: 4,
    blurb: "Pick your profile and get a reading path shaped for how you work.",
  },
  {
    id: "why",
    label: "Why product",
    title: "Why product ways of working",
    kicker: "Foundations",
    icon: Flame,
    readMins: 5,
    blurb: "The case for change, and the Ops-Tech Integration that underpins it.",
    framework: "OTI",
  },
  {
    id: "principles",
    label: "Three principles",
    title: "The three principles",
    kicker: "Foundations",
    icon: Layers,
    readMins: 3,
    blurb: "The three principles that turn intent into outcomes: define real problems, structure the team right, test early.",
  },
  {
    id: "problems",
    label: "Define real problems",
    title: "Define the problem, measure the value",
    kicker: "Principle 01",
    icon: Target,
    readMins: 12,
    blurb: "Write problems worth solving with 6W and 4C, prioritise them with SFR, and pick metrics that prove progress.",
    framework: "METRIC",
  },
  {
    id: "team",
    label: "Structure the team right",
    title: "Structure the team right",
    kicker: "Principle 02",
    icon: Users,
    readMins: 8,
    blurb: "Single-line accountability, the Leads who run the product, squads that scale, and a RACI for who decides what.",
    framework: "TEAM",
  },
  {
    id: "test",
    label: "Test early",
    title: "Test early, iterate fast",
    kicker: "Principle 03",
    icon: FlaskConical,
    readMins: 6,
    blurb: "Four habits for testing the theory of change with real users before you build at scale.",
    framework: "TEST",
  },
  {
    id: "modernise",
    label: "Modernise legacy",
    title: "Modernise legacy products",
    kicker: "Pathway",
    icon: RefreshCw,
    readMins: 7,
    blurb: "Modernise in phases with IMPACT, without a big bang cutover or stopping operations.",
    framework: "IMPACT",
  },
  {
    id: "govern",
    label: "Govern & review",
    title: "Govern and review",
    kicker: "Assurance",
    icon: Gavel,
    readMins: 6,
    blurb: "What a reviewing body needs, a proposed council, cadences by criticality, and the questions worth asking.",
    framework: "Council",
  },
  {
    id: "tools",
    label: "Tools to use",
    title: "Tools to use",
    kicker: "Enablement",
    icon: Wrench,
    readMins: 6,
    blurb: "The DSTA flywheel and the digital toolchain that carry a team from research to a tested product.",
    framework: "Flywheel",
  },
  {
    id: "start",
    label: "Get started",
    title: "Get started",
    kicker: "Adoption",
    icon: Rocket,
    readMins: 3,
    blurb: "What good looks like at three levels, and a rollout you can start with two or three teams.",
  },
  {
    id: "glossary",
    label: "Glossary",
    title: "Glossary and terms",
    icon: BookMarked,
    readMins: 6,
    blurb: "Plain definitions and how common product terms map to the defence ecosystem.",
  },
];

export const SECTION_MAP: Record<SectionId, SectionMeta> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
) as Record<SectionId, SectionMeta>;

export interface PersonaMeta {
  id: PersonaId;
  label: string;
  role: string;
  summary: string;
  /** Ordered reading path (excludes home/glossary which bookend everything). */
  path: SectionId[];
  /** Sections most central to this persona (highlighted). */
  core: SectionId[];
}

export const PERSONAS: PersonaMeta[] = [
  {
    id: "leader",
    label: "Organisation Leader",
    role: "Chief or CE-equivalent, senior sponsor",
    summary:
      "You set direction, hold owners accountable and clear the blockers. You need the case for change, how it is governed and where to start.",
    path: ["why", "principles", "govern", "team", "modernise", "start", "problems", "test", "tools"],
    core: ["why", "principles", "govern", "team", "modernise", "start"],
  },
  {
    id: "om",
    label: "Ops Manager (OM)",
    role: "Product Owner, accountable for the outcome",
    summary:
      "You own the problem and the metric. You need to define the problem, run the team, test and prepare for review.",
    path: ["why", "problems", "team", "test", "govern", "tools", "principles", "modernise", "start"],
    core: ["why", "problems", "team", "test", "govern"],
  },
  {
    id: "practitioner",
    label: "Product, Engineering or UX",
    role: "Product Manager, UX, software engineer or a Lead",
    summary:
      "You do the work inside the squad. You need the three principles, how value is measured, how to test, and the toolchain that carries it.",
    path: ["why", "principles", "problems", "test", "tools", "team", "modernise", "govern", "start"],
    core: ["why", "principles", "problems", "test", "tools"],
  },
];

export const PERSONA_MAP: Record<PersonaId, PersonaMeta> = Object.fromEntries(
  PERSONAS.map((p) => [p.id, p]),
) as Record<PersonaId, PersonaMeta>;

/** Canonical order used when no persona is selected. */
export const CANONICAL_ORDER: SectionId[] = [
  "why",
  "principles",
  "problems",
  "team",
  "test",
  "modernise",
  "govern",
  "tools",
  "start",
];

/** Core when no profile is chosen: the case for change, plus the three principles. */
export const CANONICAL_CORE: SectionId[] = ["why", "principles", "problems", "team", "test"];

export function orderedSections(persona: PersonaId | null): SectionId[] {
  if (!persona) return CANONICAL_ORDER;
  return PERSONA_MAP[persona].path;
}

export function totalReadMins(): number {
  return SECTIONS.filter((s) => s.id !== "home" && s.id !== "glossary").reduce((a, s) => a + s.readMins, 0);
}
