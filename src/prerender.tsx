/**
 * Static render of the whole playbook, used at build time only.
 *
 * The app is a client-rendered SPA, so a fetcher that does not execute
 * JavaScript sees an empty <div id="root">. Link unfurlers, search crawlers and
 * assistants that read a URL therefore got nothing but the <meta> description.
 * `scripts/prerender.mjs` renders this tree to HTML and injects it inside
 * #root, so the document ships with its full text. React clears the container
 * when it mounts, and the inline theme script hides the block before paint, so
 * a browser never shows it.
 */
import { StoreProvider } from "@/lib/store";
import { SECTIONS } from "@/content/meta";
import { SECTION_COMPONENTS } from "@/sections";
import type { SectionId } from "@/content/meta";

const noop = () => {};

export function StaticPlaybook() {
  return (
    <StoreProvider>
      <div id="dpp-static" className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-10 border-b border-border pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-fg-subtle">MINDEF × DSTA</p>
          <h1 className="mt-2 text-3xl font-semibold text-fg">The Defence Product Playbook</h1>
          <p className="mt-3 text-lg leading-relaxed text-fg-muted">
            A joint MINDEF and DSTA guide to product ways of working: defining value, structuring teams, testing early,
            modernising legacy, governing outcomes and the tools that enable them.
          </p>
          <p className="mt-3 text-sm text-fg-subtle">Co-authored by Tan Min Min (MPO) and Alvin Loh (DSTA).</p>
        </header>

        <nav aria-label="Contents" className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-fg">Contents</h2>
          <ul className="space-y-1.5 text-sm text-fg-muted">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#/${s.id}`}>{s.title}</a> — {s.blurb}
              </li>
            ))}
          </ul>
        </nav>

        {SECTIONS.map((s) => {
          const Section = SECTION_COMPONENTS[s.id as SectionId];
          return (
            <article key={s.id} id={`section-${s.id}`} className="mb-16">
              <Section navigate={noop} openPicker={noop} />
            </article>
          );
        })}
      </div>
    </StoreProvider>
  );
}
