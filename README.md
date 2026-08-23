# The Defence Product Playbook

An interactive playbook on product ways of working for the defence ecosystem, jointly developed by MINDEF and DSTA. It presents a single, coherent operating model for defining value, structuring teams, testing early, modernising legacy products and governing outcomes, with a Tools section grounded in DSTA's ProductOps toolchain.

Co-authored by Tan Min Min (MPO) and Alvin Loh (DSTA).

Live at [defence-pp.vercel.app](https://defence-pp.vercel.app).

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

## Deploy

Hosted on Vercel as the project `dpp`, connected to this repository. A push to `main` builds and deploys to production automatically, and `defence-pp.vercel.app` follows it. Pushes to any other branch get their own preview URL.

Build settings come from `vercel.json`, so no configuration is needed in the Vercel dashboard.

To deploy from a machine without pushing, if you have access to the Vercel project:

```bash
npx vercel --prod
```

### GitHub Pages

The same build also publishes to GitHub Pages at `https://mpo-skive.github.io/product-playbook/`, via `.github/workflows/deploy-pages.yml` on every push to `main`. The workflow enables Pages itself on first run, so nothing needs setting in the repository settings.

Pages serves the site from a subpath, so the build sets `base` to `/product-playbook/` when `GITHUB_PAGES` is set. Vercel builds without that variable and stays at the root. Fonts live in `src/assets/fonts` rather than `public/` so Vite rewrites their URLs for both bases.

## Notes

- British English throughout. No em dashes.
- All examples are illustrative composites. No classified information or system-specific figures appear.
- Diagrams are original to this playbook.
