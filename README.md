# The Defence Product Playbook

An interactive playbook on product ways of working for the defence ecosystem, jointly developed by MINDEF and DSTA. It presents a single, coherent operating model for defining value, structuring teams, testing early, modernising legacy products and governing outcomes, with a Tools section grounded in DSTA's ProductOps toolchain.

Co-authored by Alvin Loh (DSTA) and Tan Min Min (MINDEF / GovTech).

## What it covers

A single spine across nine sections: Why product, the Three principles, Define real problems (METRIC), Structure the team (TEAM), Test early (TEST), Modernise legacy (IMPACT), Govern and review, Tools to use, and Get started, plus a Glossary.

Five live tools: a 4C problem-statement scorer, a metric ladder, a Value-Cost Ratio calculator, a team-structure explorer, and a fitness assessment.

## Key features

- **Guided journeys.** Readers pick a profile (Organisation Leader, Ops Manager, or Product/Engineering/Design practitioner) and the playbook reorders around a recommended path, marking core sections. Nothing is hidden. The choice persists.
- **Reading times and progress.** Every section shows minutes to read and remembers what has been read.
- **Progressive disclosure.** Detail sits behind disclosures, tabs and interactive widgets.
- **Light and dark**, built on the PRIZM 4.0 Enterprise design system with its exact tokens and self-hosted fonts.
- **Responsive** for mobile and desktop.

## Tech

Vite, React, TypeScript and Tailwind CSS v4. Motion for animation, lucide-react for icons. No external network calls at runtime (fonts are self-hosted), so it is air-gap friendly.

## Run

```bash
npm install
npm run dev
```

Then open the URL shown (default `http://localhost:5187`).

## Build

```bash
npm run build
```

Outputs a static site to `dist/`, deployable to any static host. If you deploy under a sub-path, set `base` in `vite.config.ts` accordingly.

## Notes

- British English throughout. No em dashes.
- All examples are illustrative composites. No classified information or system-specific figures appear.
- Diagrams are original to this playbook.
