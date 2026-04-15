import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { RouteHighlight } from "@/data/types";
import { IconToken } from "@/components/ui/icon-resolver";
import { cn } from "@/lib/utils";

type RouteCardProps = {
  item: RouteHighlight;
  className?: string;
};

export function RouteCard({ item, className }: RouteCardProps) {
  return (
    <Link href={item.href} className="group block h-full">
      <div className={cn("surface-card h-full rounded-[30px] p-6 sm:p-7", className)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
            <IconToken name={item.icon} className="h-6 w-6" />
          </div>
          {item.detail ? (
            <span className="rounded-full border border-border bg-surface-muted px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              {item.detail}
            </span>
          ) : null}
        </div>
        {item.kicker ? (
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-ink-muted">
            {item.kicker}
          </p>
        ) : null}
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-ink-muted">{item.description}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          {item.ctaLabel ?? "Explore route"}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
