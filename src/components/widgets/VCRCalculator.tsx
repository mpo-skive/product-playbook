import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface Scenario {
  cost: number; // annual $
  volume: number; // requests per year
  success: number; // % within SLA
}

const DEFAULT_OLD: Scenario = { cost: 100_000, volume: 100_000, success: 10 };
const DEFAULT_NEW: Scenario = { cost: 175_000, volume: 100_000, success: 35 };

function value(s: Scenario) {
  return Math.round(s.volume * (s.success / 100));
}
function vcr(s: Scenario) {
  return value(s) / s.cost;
}
function unitCost(s: Scenario) {
  const v = value(s);
  return v === 0 ? 0 : s.cost / v;
}
function money(n: number) {
  return "$" + Math.round(n).toLocaleString("en-GB");
}

export function VCRCalculator() {
  const [oldS, setOld] = useState(DEFAULT_OLD);
  const [newS, setNew] = useState(DEFAULT_NEW);

  const vOld = value(oldS);
  const vNew = value(newS);
  const vcrOld = vcr(oldS);
  const vcrNew = vcr(newS);
  const improvement = vcrOld === 0 ? 0 : Math.round(((vcrNew - vcrOld) / vcrOld) * 100);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border bg-bg-subtle px-4 py-3 sm:px-5">
        <p className="text-sm font-semibold text-fg">Value-Cost Ratio calculator</p>
        <p className="mt-0.5 text-xs text-fg-muted">
          Illustrative: a cloud platform provisioning environment requests within a service-level target. Adjust the
          numbers.
        </p>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        <ScenarioColumn label="Current platform" tone="neutral" s={oldS} onChange={setOld} value={vOld} vcr={vcrOld} unit={unitCost(oldS)} />
        <ScenarioColumn label="Modernised platform" tone="accent" s={newS} onChange={setNew} value={vNew} vcr={vcrNew} unit={unitCost(newS)} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-bg-subtle px-4 py-4 sm:px-5">
        <div className="flex items-center gap-2 text-sm text-fg-muted">
          <span className="font-mono text-fg">{vcrOld.toFixed(2)}</span>
          <ArrowRight className="h-3.5 w-3.5" />
          <span className="font-mono font-semibold text-accent">{vcrNew.toFixed(2)}</span>
          <span className="text-xs">requests within target, per $ spent</span>
        </div>
        <motion.div
          key={improvement}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold",
            improvement >= 0 ? "bg-bg-muted text-success" : "bg-bg-muted text-danger",
          )}
        >
          <TrendingUp className={cn("h-4 w-4", improvement < 0 && "rotate-180")} />
          {improvement >= 0 ? "+" : ""}
          {improvement}% VCR
        </motion.div>
      </div>
    </div>
  );
}

function ScenarioColumn({
  label,
  tone,
  s,
  onChange,
  value: v,
  vcr: vc,
  unit,
}: {
  label: string;
  tone: "neutral" | "accent";
  s: Scenario;
  onChange: (s: Scenario) => void;
  value: number;
  vcr: number;
  unit: number;
}) {
  return (
    <div className="bg-surface p-4 sm:p-5">
      <span
        className={cn(
          "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
          tone === "accent" ? "bg-accent-subtle text-accent" : "bg-bg-muted text-fg-muted",
        )}
      >
        {label}
      </span>

      <div className="mt-4 space-y-4">
        <Slider label="Annual cost" min={50_000} max={400_000} step={5_000} value={s.cost} format={money} onChange={(cost) => onChange({ ...s, cost })} />
        <Slider label="Requests per year" min={20_000} max={200_000} step={5_000} value={s.volume} format={(n) => n.toLocaleString("en-GB")} onChange={(volume) => onChange({ ...s, volume })} />
        <Slider label="Met within target" min={0} max={100} step={1} value={s.success} format={(n) => `${n}%`} onChange={(success) => onChange({ ...s, success })} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
        <Metric label="Value" value={v.toLocaleString("en-GB")} sub="within target" />
        <Metric label="VCR" value={vc.toFixed(2)} sub="per $" accent={tone === "accent"} />
        <Metric label="Unit cost" value={money(unit)} sub="each" />
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  format,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-fg-muted">{label}</span>
        <span className="dpp-tabular font-semibold text-fg">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="dpp-range w-full"
        aria-label={label}
      />
    </div>
  );
}

function Metric({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[0.65rem] font-medium uppercase tracking-wider text-fg-subtle">{label}</p>
      <p className={cn("mt-0.5 text-lg font-semibold dpp-tabular", accent ? "text-accent" : "text-fg")}>{value}</p>
      <p className="text-[0.65rem] text-fg-subtle">{sub}</p>
    </div>
  );
}
