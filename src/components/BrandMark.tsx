import { cn } from "@/lib/cn";

/** The Double-Diamond-inspired playbook mark. Uses currentColor for the second
 *  diamond so it reads in both themes. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden="true">
      <rect width="32" height="32" rx="7" className="fill-accent" />
      <path d="M6 16 L11.5 9 L16 16 L11.5 23 Z" className="fill-accent-fg" />
      <path d="M16 16 L21.5 9 L27 16 L21.5 23 Z" className="fill-accent-fg" opacity="0.6" />
    </svg>
  );
}
