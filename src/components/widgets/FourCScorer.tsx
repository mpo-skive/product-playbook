import { useState } from "react";
import { motion } from "motion/react";
import { Check, X, Info } from "lucide-react";
import { cn } from "@/lib/cn";
import { Segmented } from "@/components/interactive";

const CRITERIA = [
  {
    key: "clarity",
    letter: "C",
    name: "Clarity",
    check: "One specific user group, the task they attempt, the friction, and how severe and frequent it is.",
  },
  {
    key: "consequence",
    letter: "C",
    name: "Consequence",
    check: "The quantified cost if the problem stays unsolved.",
  },
  {
    key: "cause",
    letter: "C",
    name: "Cause",
    check: "A theory of change: the causal chain, and the one step worth intervening at.",
  },
  {
    key: "confirmation",
    letter: "C",
    name: "Confirmation",
    check: "Evidence that supports the cause you identified.",
  },
] as const;

type Key = (typeof CRITERIA)[number]["key"];

const W_COLOUR: Record<string, string> = {
  Who: "var(--color-success)",
  Where: "var(--color-warning)",
  When: "var(--color-warning)",
  What: "var(--color-accent)",
  "Why it happens": "var(--color-danger)",
  "Why it matters": "var(--color-info)",
};

const EXAMPLES = {
  weak: {
    label: "Weak",
    statement: "Our C2 system is reaching end of life and needs to be replaced.",
    met: { clarity: false, consequence: false, cause: false, confirmation: false },
    note: "This names a solution and an age, not a problem. It says nothing about who is stuck, what it costs, or why.",
  },
  better: {
    label: "Improved",
    statement:
      "Watchkeepers in the joint operations centre cannot fuse air and maritime tracks from three separate consoles under time pressure, adding an estimated 40 seconds to each recognised-picture update during surge periods, which erodes decision advantage in the kill chain. Manual cross-console correlation is the single largest contributor. A two-week console log study of 600 track updates shows correlation accounts for a median 38 of those seconds.",
    segments: [
      ["Watchkeepers", "Who"],
      [" in the joint operations centre", "Where"],
      [" cannot fuse air and maritime tracks from three separate consoles under time pressure", "What"],
      [", adding an estimated 40 seconds to each recognised-picture update", "Why it matters"],
      [" during surge periods", "When"],
      [", which erodes decision advantage in the kill chain.", "Why it matters"],
      [" Manual cross-console correlation is the single largest contributor.", "Why it happens"],
      [" A two-week console log study of 600 track updates shows correlation accounts for a median 38 of those seconds.", null],
    ] as [string, string | null][],
    met: { clarity: true, consequence: true, cause: true, confirmation: true },
    note: "Specific user, quantified consequence, a named cause, and evidence for it. This is a problem a team can be held to.",
  },
} as const;

export function FourCScorer() {
  const [example, setExample] = useState<keyof typeof EXAMPLES>("weak");
  const [met, setMet] = useState<Record<Key, boolean>>(EXAMPLES.weak.met);

  function loadExample(k: keyof typeof EXAMPLES) {
    setExample(k);
    setMet({ ...EXAMPLES[k].met });
  }

  const current = EXAMPLES[example];
  const segments = "segments" in current ? current.segments : null;
  const score = CRITERIA.filter((c) => met[c.key]).length;
  const verdict =
    score === 4
      ? { tone: "success", text: "Ready to review. This problem is defined tightly enough to hold a team accountable." }
      : score >= 2
        ? { tone: "warning", text: "Getting there. Close the gaps below before you take this to a review." }
        : { tone: "danger", text: "Not yet a problem statement. It likely describes a solution, an aspiration or an age." };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-bg-subtle px-4 py-3 sm:px-5">
        <span className="text-sm font-semibold text-fg">4C problem-statement check</span>
        <Segmented
          size="sm"
          value={example}
          onChange={(v) => loadExample(v as keyof typeof EXAMPLES)}
          options={[
            { value: "weak", label: "Weak example" },
            { value: "better", label: "Improved" },
          ]}
        />
      </div>

      <div className="p-4 sm:p-5">
        <div className="rounded-lg border border-border bg-bg-subtle p-4">
          <p className={cn("text-sm italic text-fg", segments ? "leading-loose" : "leading-relaxed")}>
            &ldquo;
            {segments
              ? segments.map(([text, w], i) => {
                  if (!w) return <span key={i}>{text}</span>;
                  const lead = text.startsWith(" ") ? " " : "";
                  const c = W_COLOUR[w];
                  return (
                    <span key={i}>
                      {lead}
                      <span
                        className="text-fg"
                        style={{ boxShadow: `inset 0 -1.5px 0 0 color-mix(in oklab, ${c} 70%, transparent)` }}
                      >
                        {text.slice(lead.length)}
                        <span
                          className="ml-1 whitespace-nowrap align-baseline text-[0.6rem] font-semibold not-italic uppercase tracking-wide opacity-80"
                          style={{ color: c }}
                        >
                          {w}
                        </span>
                      </span>
                    </span>
                  );
                })
              : EXAMPLES[example].statement}
            &rdquo;
          </p>
        </div>

        <p className="mt-4 mb-2 text-xs font-medium text-fg-subtle">
          Tick each dimension it satisfies. Try it on your own statement too.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CRITERIA.map((c) => {
            const on = met[c.key];
            return (
              <button
                key={c.key}
                onClick={() => setMet((m) => ({ ...m, [c.key]: !m[c.key] }))}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                  on ? "border-accent bg-accent-subtle" : "border-border hover:border-border-strong",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    on ? "border-accent bg-accent text-accent-fg" : "border-border-strong text-transparent",
                  )}
                >
                  {on ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5 opacity-0" />}
                </span>
                <span>
                  <span className={cn("text-sm font-semibold", on ? "text-accent" : "text-fg")}>{c.name}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-fg-muted">{c.check}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* score meter */}
        <div className="mt-5 flex items-center gap-4">
          <div className="flex gap-1.5">
            {CRITERIA.map((c, i) => (
              <div
                key={c.key}
                className={cn(
                  "h-2 w-10 rounded-full transition-colors",
                  i < score ? "bg-accent" : "bg-bg-muted",
                )}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-fg dpp-tabular">{score} / 4</span>
        </div>

        <motion.div
          key={verdict.text}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "mt-3 flex items-start gap-2 rounded-lg border border-l-4 bg-bg-subtle p-3 text-sm",
            verdict.tone === "success" && "border-l-success text-success",
            verdict.tone === "warning" && "border-l-warning text-warning",
            verdict.tone === "danger" && "border-l-danger text-danger",
          )}
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="text-fg-muted">{verdict.text}</span>
        </motion.div>
      </div>
    </div>
  );
}
