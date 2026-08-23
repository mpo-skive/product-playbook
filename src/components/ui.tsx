import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ---------------------------------- Card ---------------------------------- */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { interactive?: boolean; accent?: boolean }>(
  ({ className, interactive, accent, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-surface text-fg",
        "shadow-[var(--shadow-sm)]",
        accent && "border-l-4 border-l-accent",
        interactive && "transition-colors duration-200 hover:border-border-strong",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

/* --------------------------------- Button --------------------------------- */
type BtnVariant = "solid" | "outline" | "ghost" | "subtle";
type BtnSize = "sm" | "md" | "lg" | "icon";
const btnBase =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";
const btnVariants: Record<BtnVariant, string> = {
  solid: "bg-accent text-accent-fg hover:bg-accent-hover",
  outline: "border border-border-strong text-fg hover:bg-bg-muted",
  ghost: "text-fg-muted hover:bg-bg-muted hover:text-fg",
  subtle: "bg-bg-muted text-fg hover:bg-border",
};
const btnSizes: Record<BtnSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  icon: "h-9 w-9",
};
export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: BtnSize }
>(({ className, variant = "solid", size = "md", ...props }, ref) => (
  <button ref={ref} className={cn(btnBase, btnVariants[variant], btnSizes[size], className)} {...props} />
));
Button.displayName = "Button";

/* --------------------------------- Badge ---------------------------------- */
type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger" | "info" | "outline";
const badgeTones: Record<BadgeTone, string> = {
  neutral: "bg-bg-muted text-fg-muted",
  accent: "bg-accent-subtle text-accent",
  success: "bg-bg-muted text-success",
  warning: "bg-bg-muted text-warning",
  danger: "bg-bg-muted text-danger",
  info: "bg-bg-muted text-info",
  outline: "border border-border-strong text-fg-muted",
};
export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium leading-5 whitespace-nowrap",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------- Kicker ---------------------------------- */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("text-xs font-semibold uppercase tracking-[0.14em] text-accent", className)}>{children}</span>
  );
}

/* -------------------------------- Callout --------------------------------- */
type CalloutTone = "info" | "success" | "warning" | "danger" | "accent";
const calloutTone: Record<CalloutTone, { bar: string; text: string }> = {
  info: { bar: "border-l-info", text: "text-info" },
  success: { bar: "border-l-success", text: "text-success" },
  warning: { bar: "border-l-warning", text: "text-warning" },
  danger: { bar: "border-l-danger", text: "text-danger" },
  accent: { bar: "border-l-accent", text: "text-accent" },
};
export function Callout({
  tone = "accent",
  title,
  icon,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  const t = calloutTone[tone];
  return (
    <div className={cn("rounded-lg border border-border border-l-4 bg-bg-subtle p-4 sm:p-5", t.bar)}>
      {title && (
        <div className={cn("mb-1.5 flex items-center gap-2 text-sm font-semibold", t.text)}>
          {icon}
          {title}
        </div>
      )}
      <div className="text-sm leading-relaxed text-fg-muted [&_strong]:text-fg [&_strong]:font-semibold">{children}</div>
    </div>
  );
}

/* --------------------------------- Prose ---------------------------------- */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-none text-[0.975rem] leading-[1.7] text-fg-muted",
        "[&_p]:mb-4 [&_p:last-child]:mb-0",
        "[&_strong]:text-fg [&_strong]:font-semibold",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-hover",
        "[&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ----------------------------- Section heading ---------------------------- */
export function LeadHeading({
  kicker,
  title,
  lead,
  id,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <header id={id} className="scroll-mt-24">
      {kicker && <Kicker className="mb-3 block">{kicker}</Kicker>}
      <h2 className="text-balance text-3xl font-semibold text-fg sm:text-[2.1rem]">{title}</h2>
      {lead && <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">{lead}</p>}
    </header>
  );
}
