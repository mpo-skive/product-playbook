import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const PHASES = [
  { id: "discover", label: "Discover", note: "Widen. Research the problem space with operators and data.", side: "problem" },
  { id: "define", label: "Define", note: "Narrow. Frame a single, sharp problem worth solving.", side: "problem" },
  { id: "develop", label: "Develop", note: "Widen. Prototype and explore candidate solutions.", side: "solution" },
  { id: "deliver", label: "Deliver", note: "Narrow. Test, choose and field what works.", side: "solution" },
] as const;

/** Design Innovation, the Double Diamond. Two diamonds: problem then
 *  solution, each diverging then converging. Interactive on hover / focus. */
export function DoubleDiamond({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const h = compact ? 150 : 190;
  const mid = h / 2;
  const w = 640;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface p-4 sm:p-6">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h + 46}`} className="w-full min-w-[520px]" role="img" aria-label="The Double Diamond: Discover, Define, Develop, Deliver">
          {/* centre line */}
          <line x1="8" y1={mid} x2={w - 8} y2={mid} stroke="var(--color-border)" strokeDasharray="4 5" />

          {/* Problem diamond */}
          <path
            d={`M 20 ${mid} L 165 24 L 310 ${mid} L 165 ${h - 24} Z`}
            className={cn("transition-colors duration-300", active === "discover" || active === "define" ? "fill-accent-subtle" : "fill-bg-muted")}
            stroke="var(--color-accent)"
            strokeWidth="1.5"
          />
          {/* Solution diamond */}
          <path
            d={`M 330 ${mid} L 475 24 L 620 ${mid} L 475 ${h - 24} Z`}
            className={cn("transition-colors duration-300", active === "develop" || active === "deliver" ? "fill-accent-subtle" : "fill-bg-muted")}
            stroke="var(--color-accent)"
            strokeWidth="1.5"
          />

          {/* labels above */}
          <text x="165" y="14" textAnchor="middle" className="fill-[var(--color-fg-subtle)] text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.1em" }}>
            Right problem
          </text>
          <text x="475" y="14" textAnchor="middle" className="fill-[var(--color-fg-subtle)] text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.1em" }}>
            Right solution
          </text>

          {/* phase hotspots */}
          {PHASES.map((p, i) => {
            const cx = 90 + i * 155;
            return (
              <g
                key={p.id}
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                tabIndex={0}
                onFocus={() => setActive(p.id)}
                onBlur={() => setActive(null)}
                className="cursor-pointer outline-none"
              >
                <rect x={cx - 62} y={24} width="124" height={h - 48} fill="transparent" />
                <text
                  x={cx}
                  y={mid + 4}
                  textAnchor="middle"
                  className={cn(
                    "text-[13px] font-semibold transition-colors",
                    active === p.id ? "fill-[var(--color-accent)]" : "fill-[var(--color-fg)]",
                  )}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <motion.p
        key={active ?? "default"}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 min-h-[2.5rem] text-sm text-fg-muted"
      >
        {active ? (
          <>
            <span className="font-semibold text-fg">{PHASES.find((p) => p.id === active)?.label}. </span>
            {PHASES.find((p) => p.id === active)?.note}
          </>
        ) : (
          "Hover a phase. Diverge to explore, converge to decide, twice: first on the problem, then on the solution."
        )}
      </motion.p>
    </div>
  );
}
