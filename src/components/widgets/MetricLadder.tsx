import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const RUNGS = [
  {
    key: "input",
    name: "Input metric",
    confidence: 20,
    tone: "danger",
    def: "Measures activity that may not lead to any outcome. Gives no confidence the problem is moving.",
    example: "Number of logins to the new C2 client.",
  },
  {
    key: "leading",
    name: "Leading indicator",
    confidence: 55,
    tone: "warning",
    def: "Measures an immediate behaviour change after the input. Validates the assumptions at the top of the funnel.",
    example: "Share of track updates now made through the fused view rather than single-source consoles.",
  },
  {
    key: "value",
    name: "Value metric",
    confidence: 85,
    tone: "success",
    def: "A leading indicator that directly measures the intended outcome of solving your problem. This is your North Star, the one the team steers by. Define one per problem, and pick one that can move at least twice a year.",
    example: "Median time to a confirmed recognised picture during surge periods.",
  },
  {
    key: "outcome",
    name: "Outcome metric",
    confidence: 100,
    tone: "accent",
    def: "The ultimate effect the organisation is trying to achieve. Often lagging and slow to move, so it cannot guide week-to-week iteration on its own. Your value metric should be a leading indicator of it.",
    example: "Decision advantage sustained across a contested operation.",
  },
] as const;

export function MetricLadder() {
  const [active, setActive] = useState<string>("value");
  const cur = RUNGS.find((r) => r.key === active)!;

  return (
    <div className="grid gap-4 rounded-xl border border-border bg-surface p-4 sm:p-6 md:grid-cols-2">
      <div className="flex flex-col-reverse gap-2">
        {RUNGS.map((r, i) => {
          const on = active === r.key;
          return (
            <button
              key={r.key}
              onClick={() => setActive(r.key)}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                on ? "border-accent bg-accent-subtle" : "border-border hover:border-border-strong",
              )}
              style={{ marginLeft: `${i * 8}px` }}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  on ? "bg-accent text-accent-fg" : "bg-bg-muted text-fg-muted",
                )}
              >
                {i + 1}
              </span>
              <span className={cn("text-sm font-semibold", on ? "text-accent" : "text-fg")}>{r.name}</span>
              {r.key === "value" && (
                <span className="ml-auto shrink-0 rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-accent-fg">
                  Aim here
                </span>
              )}
            </button>
          );
        })}
        <p className="mt-1 pl-1 text-xs text-fg-subtle">
          Confidence the problem is truly being solved rises up the ladder, but so does the time it takes to see a
          change.
        </p>
      </div>

      <div className="flex flex-col justify-between rounded-lg border border-border bg-bg-subtle p-4">
        <div>
          <motion.div key={cur.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-fg">{cur.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cur.def}</p>
            <div className="mt-3 rounded-md border border-border bg-surface p-3">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-fg-subtle">Defence example</p>
              <p className="mt-1 text-sm text-fg">{cur.example}</p>
            </div>
          </motion.div>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs text-fg-subtle">
            <span>Confidence it is being solved</span>
            <span className="dpp-tabular font-semibold text-fg">{cur.confidence}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-bg-muted">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={false}
              animate={{ width: `${cur.confidence}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
