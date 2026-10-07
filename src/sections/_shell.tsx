import type { ReactNode } from "react";
import { Clock } from "lucide-react";
import { SECTION_MAP, PERSONA_MAP, type SectionId } from "@/content/meta";
import { useStore } from "@/lib/store";
import { Kicker, Badge } from "@/components/ui";
import type { SectionId as SID } from "@/content/meta";

export interface SectionProps {
  navigate: (id: SectionId) => void;
  openPicker: () => void;
}

/** Consistent title block for every section. */
export function SectionHead({ id, children }: { id: SID; children?: ReactNode }) {
  const s = SECTION_MAP[id];
  const { persona } = useStore();
  const isCore = persona ? PERSONA_MAP[persona].core.includes(id) : false;

  return (
    <header className="mb-10">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {s.kicker && <Kicker>{s.kicker}</Kicker>}
        {s.framework && <Badge tone="accent">{s.framework}</Badge>}
        {isCore && persona && <Badge tone="success">Core for {PERSONA_MAP[persona].label}</Badge>}
      </div>
      <h1 className="text-balance text-[2.1rem] font-semibold leading-[1.1] text-fg sm:text-[2.6rem]">{s.title}</h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-fg-subtle">
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {s.readMins} min read
        </span>
      </div>
      {children && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">{children}</p>}
    </header>
  );
}

/** A numbered/lettered content block with a heading. */
export function Block({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow?: string;
  title?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      {eyebrow && <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>}
      {title && <h2 className="mb-4 text-2xl font-semibold text-fg">{title}</h2>}
      {children}
    </section>
  );
}
