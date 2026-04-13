import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <span className="gold-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-sm font-bold text-ink">
        SH
      </span>
      <span className="flex flex-col">
        <span className="font-display text-lg font-semibold tracking-tight text-ink">Student Hub</span>
        {!compact ? (
          <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">
            A beginning of a successful career.
          </span>
        ) : null}
      </span>
    </Link>
  );
}
