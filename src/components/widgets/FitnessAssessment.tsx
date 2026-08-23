import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const DIMENSIONS = [
  { key: "business", name: "Business relevance", q: "Does it meet current needs and support the changes expected in the next 2 to 3 years?" },
  { key: "ux", name: "User experience", q: "Is it easy for operators to use?" },
  { key: "data", name: "Data", q: "Does it give users timely, accurate data?" },
  { key: "resilience", name: "Resilience", q: "Does it meet the required uptime for its role?" },
  { key: "cost", name: "Cost", q: "Are the running costs reasonable for the value delivered?" },
] as const;

const RATINGS = [
  { v: 1, label: "Poor" },
  { v: 2, label: "Fair" },
  { v: 3, label: "Good" },
  { v: 4, label: "Excellent" },
];

export function FitnessAssessment() {
  const [scores, setScores] = useState<Record<string, number>>({
    business: 2,
    ux: 2,
    data: 3,
    resilience: 3,
    cost: 2,
  });
  const [criticality, setCriticality] = useState(70);

  const vals = Object.values(scores);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  const outdatedness = ((4 - avg) / 3) * 100; // 0 = fresh, 100 = very outdated

  const verdict =
    avg >= 3.2
      ? { tone: "success", text: "Fit for purpose. Maintain and monitor, rather than modernise now." }
      : avg >= 2.3
        ? { tone: "warning", text: "Ageing. Watch the weak dimensions and plan ahead." }
        : { tone: "danger", text: "Outdated. A strong candidate for modernisation." };

  const priority =
    outdatedness > 55 && criticality > 55
      ? "Modernise first"
      : outdatedness > 55
        ? "Queue for modernisation"
        : criticality > 55
          ? "Protect and monitor"
          : "Low priority";

  // quadrant coordinates (x = outdatedness, y = criticality inverted for screen)
  const px = 8 + (outdatedness / 100) * 84;
  const py = 8 + ((100 - criticality) / 100) * 84;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border bg-bg-subtle px-4 py-3 sm:px-5">
        <p className="text-sm font-semibold text-fg">Fitness assessment</p>
        <p className="mt-0.5 text-xs text-fg-muted">Rate a product across five dimensions. Outdatedness is the inverse of fitness.</p>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-2">
        <div className="space-y-3">
          {DIMENSIONS.map((d) => (
            <div key={d.key}>
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-fg">{d.name}</span>
                <span className="text-xs text-fg-subtle">{RATINGS[scores[d.key] - 1].label}</span>
              </div>
              <div className="flex gap-1.5">
                {RATINGS.map((r) => (
                  <button
                    key={r.v}
                    onClick={() => setScores((s) => ({ ...s, [d.key]: r.v }))}
                    aria-label={`${d.name}: ${r.label}`}
                    className={cn(
                      "h-7 flex-1 rounded-md border text-xs font-semibold transition-colors",
                      scores[d.key] >= r.v
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-border bg-bg-subtle text-fg-subtle hover:border-border-strong",
                    )}
                  >
                    {r.v}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-[0.7rem] leading-snug text-fg-subtle">{d.q}</p>
            </div>
          ))}

          <div className="border-t border-border pt-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-fg">Mission criticality</span>
              <span className="text-xs font-semibold text-fg dpp-tabular">{criticality}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={criticality}
              onChange={(e) => setCriticality(Number(e.target.value))}
              className="dpp-range w-full"
              aria-label="Mission criticality"
            />
          </div>
        </div>

        {/* quadrant + verdict */}
        <div className="flex flex-col gap-4">
          <div className="relative rounded-lg border border-border bg-bg-subtle p-3">
            <div className="relative aspect-square w-full">
              {/* axes */}
              <div className="absolute inset-[8%] rounded-md border border-dashed border-border-strong" />
              <div className="absolute left-1/2 top-[8%] h-[84%] w-px bg-border-strong" />
              <div className="absolute left-[8%] top-1/2 h-px w-[84%] bg-border-strong" />
              {/* quadrant labels */}
              <span className="absolute right-[10%] top-[10%] max-w-[42%] text-right text-[0.6rem] font-semibold leading-tight text-accent">Modernise first</span>
              <span className="absolute left-[10%] top-[10%] max-w-[42%] text-[0.6rem] leading-tight text-fg-subtle">Protect and monitor</span>
              <span className="absolute left-[10%] bottom-[10%] max-w-[42%] text-[0.6rem] leading-tight text-fg-subtle">Low priority</span>
              <span className="absolute right-[10%] bottom-[10%] max-w-[42%] text-right text-[0.6rem] leading-tight text-fg-subtle">Queue for later</span>
              {/* marker */}
              <motion.div
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent shadow-[var(--shadow-md)]"
                animate={{ left: `${px}%`, top: `${py}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[0.6rem] text-fg-subtle">
              <span>Less outdated</span>
              <span>More outdated →</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg-subtle">Average fitness</span>
              <span className="text-sm font-semibold text-fg dpp-tabular">{avg.toFixed(1)} / 4</span>
            </div>
            <motion.div
              key={verdict.text}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-2 rounded-lg border border-l-4 bg-bg-subtle p-3 text-sm",
                verdict.tone === "success" && "border-l-success",
                verdict.tone === "warning" && "border-l-warning",
                verdict.tone === "danger" && "border-l-danger",
              )}
            >
              <p className="font-semibold text-fg">{priority}</p>
              <p className="mt-0.5 text-fg-muted">{verdict.text}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
