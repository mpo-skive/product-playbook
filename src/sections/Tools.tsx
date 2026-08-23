import { Boxes, ShieldCheck, Sparkles, ExternalLink, Layers } from "lucide-react";
import { Callout, Prose, Card, Badge } from "@/components/ui";
import { Reveal } from "@/components/interactive";
import { Flywheel } from "@/components/widgets/Flywheel";
import { SectionHead, Block, type SectionProps } from "./_shell";
import { cn } from "@/lib/cn";

type ToolType = "bespoke" | "cots";

interface Tool {
  name: string;
  type: ToolType;
  phase: string;
  what: string;
  when: string;
}

const TOOLS: Tool[] = [
  { name: "CLARA", type: "bespoke", phase: "Research \u00b7 Design \u00b7 Test", what: "An AI product-intelligence tool that reads a programme's knowledge base, drafts structured research artefacts, and files them back with citations.", when: "The hub through which most prompts run, across the whole flywheel." },
  { name: "PRIZM", type: "bespoke", phase: "Design", what: "An AI-ingestible design system. Components, tokens and templates that models read and generate conformant UI from. This playbook is built on it.", when: "Any digital interface work. It is the paved road." },
  { name: "DASH", type: "bespoke", phase: "Test", what: "A measurement platform for UX and product metrics: usability, satisfaction, OKRs, and capability metrics for engineering.", when: "Baselining before, and proving the outcome after." },
  { name: "Claude Code", type: "cots", phase: "Design", what: "Natural-language code generation for rapid prototyping straight from a requirements doc, paired with PRIZM for conformant output.", when: "Turning a validated design into a working prototype fast." },
  { name: "Dynatrace", type: "cots", phase: "Test", what: "Live product instrumentation with natural-language insight extraction on running products.", when: "Understanding how a fielded product actually behaves." },
];

export default function Tools({ navigate }: SectionProps) {
  return (
    <div>
      <SectionHead id="tools">
        DSTA's ProductOps Pipeline provides the flywheel and the toolchain that take a team from research to a tested
        product, holding the same quality bar however the work is authored.
      </SectionHead>

      <Block eyebrow="The enterprise layer" title="ProductOps sits above delivery">
        <Prose>
          <p>
            DSTA runs three operating disciplines in parallel. <strong>ProductOps</strong> governs what gets built, how
            product decisions are made, and whether what ships achieves the intended effect. <strong>DevSecOps</strong>{" "}
            governs how software is built, secured and shipped. <strong>MLOps</strong> governs how models are trained
            and deployed. ProductOps is the upstream layer that decides what the other two operate on.
          </p>
          <p>
            This is the enterprise-level Product Ops referred to earlier, distinct from the squad-level Product Ops
            role. It is the reason a small team can move fast without reinventing standards, tooling or assurance each
            time.
          </p>
        </Prose>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            { t: "ProductOps", d: "What to build, and whether it worked", accent: true },
            { t: "DevSecOps", d: "How it is built, secured and shipped" },
            { t: "MLOps", d: "How models are trained and deployed" },
          ].map((x) => (
            <div key={x.t} className={cn("rounded-lg border p-4", x.accent ? "border-accent bg-accent-subtle" : "border-border bg-surface")}>
              <p className={cn("text-sm font-semibold", x.accent ? "text-accent" : "text-fg")}>{x.t}</p>
              <p className="mt-0.5 text-xs text-fg-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block eyebrow="The operational core" title="The flywheel, not a production line">
        <Prose className="mb-5">
          <p>
            Instead of locking finished designs and handing them off, each turn of the flywheel produces reference
            artefacts that DevSecOps acts on concurrently. Research is the outer loop, run thoroughly up front. Design
            and Test are the fast inner loop. Click a phase.
          </p>
        </Prose>
        <Reveal>
          <Flywheel />
        </Reveal>
        <p className="mt-3 text-sm text-fg-muted">
          It maps cleanly onto the three principles: Research is where you <button onClick={() => navigate("problems")} className="text-accent underline underline-offset-2">define the problem</button>,
          and the Design-Test inner loop is how you <button onClick={() => navigate("test")} className="text-accent underline underline-offset-2">test &amp; iterate</button> your
          way to the right solution.
        </p>
      </Block>

      <Block eyebrow="The toolchain" title="Tools that carry each phase">
        <div className="grid gap-3 sm:grid-cols-2">
          {TOOLS.map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i * 0.04, 0.2)}>
              <Card className="flex h-full flex-col p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-fg">{t.name}</span>
                  <Badge tone={t.type === "bespoke" ? "accent" : "outline"}>{t.type === "bespoke" ? "Bespoke" : "COTS"}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-fg-muted">{t.what}</p>
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-fg-subtle">When to use</p>
                  <p className="mt-0.5 text-xs text-fg-muted">{t.when}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-fg-subtle">{t.phase}</span>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block eyebrow="Assurance" title="One quality bar, whoever writes the code">
        <Prose className="mb-5">
          <p>
            As AI writes more of both functional and non-functional code, quality cannot rest on who authored it. The
            ProductOps Quality Model engineers parity in four layers, early rather than late.
          </p>
        </Prose>
        <div className="space-y-2.5">
          {[
            { l: "L1", n: "Prevention", d: "Before the build. Rules in CLAUDE.md, PRIZM paved-road components, typed contract boundaries. Parity is engineered here.", when: "Pre-build" },
            { l: "L2", n: "Outcome validation", d: "Within ProductOps. Test plans, usability, scorecards and OKRs flow into DASH. Did the work achieve its intended effect?", when: "Design onwards" },
            { l: "L3", n: "Automated scan", d: "Within DevSecOps, at pull request. Composition analysis, static and dynamic scanning, container checks.", when: "At PR" },
            { l: "L4", n: "Integration verification", d: "After merge. Confirms the pieces work together in the whole.", when: "Post-merge" },
          ].map((x, i) => (
            <Reveal key={x.l} delay={i * 0.05}>
              <div className="flex items-start gap-3.5 rounded-xl border border-border bg-surface p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-fg">{x.l}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-fg">{x.n}</span>
                    <Badge tone="outline">{x.when}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{x.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Callout tone="accent" title="Parity is engineered at L1, not enforced at L3" icon={<ShieldCheck className="h-4 w-4" />}>
          <p>
            If quality only shows up at the scan gate, you are catching problems late and expensively. Build the guard
            rails into the paved road, and most defects never get written.
          </p>
        </Callout>
      </Block>

      <Card className="mt-10 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between" accent>
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-semibold text-fg">Explore the live pipeline</p>
            <p className="mt-0.5 text-sm text-fg-muted">
              The full toolchain, prompt library and guided journeys live in the DSTA ProductOps Co-pilot.
            </p>
          </div>
        </div>
        <a
          href="https://productops-copilot.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border-strong px-3.5 py-2 text-sm font-medium text-fg transition-colors hover:border-accent"
        >
          Open the Co-pilot
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Card>
    </div>
  );
}
