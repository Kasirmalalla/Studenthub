import type { LucideIcon } from "lucide-react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  kicker?: string;
  className?: string;
};

export function InfoCard({
  icon: Icon,
  title,
  description,
  href,
  kicker,
  className,
}: InfoCardProps) {
  const content = (
    <div className={cn("surface-card h-full rounded-[28px] p-6 transition duration-200 group-hover:-translate-y-1 sm:p-7", className)}>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
        <Icon className="h-6 w-6" />
      </div>
      {kicker ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-ink-muted">{kicker}</p>
      ) : null}
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink-muted">{description}</p>
      {href ? (
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      ) : null}
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="group block h-full">
      {content}
    </Link>
  );
}
