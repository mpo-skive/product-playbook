import { useState } from "react";
import { motion } from "motion/react";
import { Compass, PenTool, FlaskConical } from "lucide-react";
import { cn } from "@/lib/cn";

const PHASES = [
  {
    id: "research",
    name: "Research",
    icon: Compass,
    loop: "Outer loop",
    stages: ["Discovery", "Synthesis", "Artefact production"],
    text: "Understand the problem deeply. Run thoroughly at the start of a track, and revisit only when findings reshape the problem itself.",
    angle: -90,
  },
  {
    id: "design",
    name: "Design",
    icon: PenTool,
    loop: "Inner loop",
    stages: ["Build a testable artefact", "Prototype or storyboard"],
    text: "Turn the framed problem into something a user can react to, usually an interactive prototype rather than a specification.",
    angle: 30,
  },
  {
    id: "test",
    name: "Test",
    icon: FlaskConical,
    loop: "Inner loop",
    stages: ["Plan", "Measure", "Act"],
    text: "Put the artefact in front of real users, capture signal, and iterate. Most of a team's effort goes here.",
    angle: 150,
  },
];

export function Flywheel() {
  const [active, setActive] = useState("research");
  const cur = PHASES.find((p) => p.id === active)!;
  const size = 260;
  const r = 96;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="grid items-center gap-5 rounded-xl border border-border bg-surface p-4 sm:p-6 md:grid-cols-2">
      <div className="mx-auto">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[260px]" role="img" aria-label="The ProductOps flywheel: Research, Design, Test">
          {/* rotating ring */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          <circle cx={cx} cy={cy} r={r - 26} fill="none" stroke="var(--color-border)" strokeWidth="1" opacity="0.5" />

          {/* nodes */}
          {PHASES.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const x = cx + r * Math.cos(rad);
            const y = cy + r * Math.sin(rad);
            const on = active === p.id;
            return (
              <g key={p.id} onClick={() => setActive(p.id)} className="cursor-pointer">
                <circle
                  cx={x}
                  cy={y}
                  r="30"
                  className={cn("transition-colors", on ? "fill-accent" : "fill-bg-muted")}
                  stroke="var(--color-accent)"
                  strokeWidth={on ? 2.5 : 1.25}
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  className={cn("pointer-events-none text-[12px] font-semibold transition-colors", on ? "fill-[var(--color-accent-fg)]" : "fill-[var(--color-fg)]")}
                >
                  {p.name}
                </text>
              </g>
            );
          })}
          {/* direction arrowheads on the ring between nodes */}
          {[-30, 90, 210].map((a) => {
            const rad = (a * Math.PI) / 180;
            const x = cx + r * Math.cos(rad);
            const y = cy + r * Math.sin(rad);
            return <circle key={a} cx={x} cy={y} r="2.5" className="fill-accent" opacity="0.6" />;
          })}

          {/* centre label */}
          <text x={cx} y={cy - 4} textAnchor="middle" className="fill-[var(--color-fg)] text-[13px] font-semibold">
            Flywheel
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" className="fill-[var(--color-fg-subtle)] text-[9px] uppercase" style={{ letterSpacing: "0.1em" }}>
            ProductOps
          </text>
        </svg>
        {/* icon overlay row for accessibility of labels */}
        <div className="mt-2 flex justify-center gap-2">
          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                active === p.id ? "bg-accent-subtle text-accent" : "text-fg-subtle hover:text-fg",
              )}
            >
              <p.icon className="h-3.5 w-3.5" />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <motion.div key={cur.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-2">
          <cur.icon className="h-5 w-5 text-accent" />
          <span className="text-lg font-semibold text-fg">{cur.name}</span>
          <span className="rounded-full bg-bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-fg-muted">{cur.loop}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cur.text}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cur.stages.map((s) => (
            <span key={s} className="rounded-md border border-border bg-bg-subtle px-2 py-1 text-xs text-fg">
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
