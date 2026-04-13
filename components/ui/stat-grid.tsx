import type { Stat } from "@/data/types";

type StatGridProps = {
  stats: Stat[];
};

export function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-[24px] border border-border bg-white/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
            {stat.label}
          </p>
          <p className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
