import { AnimatePresence, motion } from "motion/react";
import { X, Check, Compass, ArrowRight } from "lucide-react";
import { PERSONAS, PERSONA_MAP, SECTION_MAP, type Craft, type PersonaId } from "@/content/meta";
import { useStore } from "@/lib/store";
import { Button, Badge } from "@/components/ui";
import { cn } from "@/lib/cn";

const CRAFTS: { id: Craft; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "ux", label: "UX" },
];

export function PersonaPicker({
  open,
  onClose,
  onPicked,
}: {
  open: boolean;
  onClose: () => void;
  onPicked?: (p: PersonaId) => void;
}) {
  const { persona, setPersona, craft, setCraft } = useStore();

  function choose(id: PersonaId) {
    setPersona(id);
    if (id !== "practitioner") setCraft(null);
    onPicked?.(id);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Choose your profile"
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-border bg-bg-subtle p-5 shadow-[var(--shadow-lg)] sm:rounded-2xl sm:p-7"
            initial={{ y: 24, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-1.5 flex items-center gap-2 text-accent">
                  <Compass className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Guided journey</span>
                </div>
                <h2 className="text-xl font-semibold text-fg">Who is reading?</h2>
                <p className="mt-1 text-sm text-fg-muted">
                  Pick a profile and the playbook reorders itself around a path built for you.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {PERSONAS.map((p) => {
                const active = persona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => choose(p.id)}
                    className={cn(
                      "group flex flex-col rounded-xl border bg-surface p-4 text-left transition-all duration-200",
                      active
                        ? "border-accent ring-1 ring-accent"
                        : "border-border hover:border-border-strong hover:shadow-[var(--shadow-md)]",
                    )}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-fg">{p.label}</span>
                      {active && <Check className="h-4 w-4 text-accent" />}
                    </div>
                    <span className="mb-2 text-xs font-medium text-accent">{p.role}</span>
                    <span className="text-xs leading-relaxed text-fg-muted">{p.summary}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {persona === "practitioner" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 rounded-lg border border-border bg-surface p-4">
                    <p className="mb-2.5 text-xs font-medium text-fg-muted">
                      Optional: which craft is yours? We will highlight the parts that speak to it.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CRAFTS.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setCraft(craft === c.id ? null : c.id)}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                            craft === c.id
                              ? "border-accent bg-accent-subtle text-accent"
                              : "border-border-strong text-fg-muted hover:text-fg",
                          )}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {persona && (
              <div className="mt-5 rounded-xl border border-border bg-surface p-4">
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Your path</span>
                  <Badge tone="accent">{PERSONA_MAP[persona].core.length} core sections</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                  {PERSONA_MAP[persona].path.slice(0, 6).map((sid, i) => (
                    <div key={sid} className="flex items-center gap-1">
                      {i > 0 && <ArrowRight className="h-3 w-3 text-fg-subtle" />}
                      <span
                        className={cn(
                          "rounded-md px-2 py-1 text-xs font-medium",
                          PERSONA_MAP[persona].core.includes(sid)
                            ? "bg-accent-subtle text-accent"
                            : "bg-bg-muted text-fg-muted",
                        )}
                      >
                        {SECTION_MAP[sid].label}
                      </span>
                    </div>
                  ))}
                  <span className="ml-1 text-xs text-fg-subtle">and more</span>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => {
                  setPersona(null);
                  setCraft(null);
                  onClose();
                }}
                className="text-sm text-fg-subtle underline-offset-2 hover:text-fg hover:underline"
              >
                Skip, just show me everything
              </button>
              <Button onClick={onClose} disabled={!persona} className="sm:w-auto">
                {persona ? "Start reading" : "Choose a profile"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
