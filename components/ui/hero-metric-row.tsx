import type { HeroMetric } from "@/data/types";

type HeroMetricRowProps = {
  metrics: HeroMetric[];
};

export function HeroMetricRow({ metrics }: HeroMetricRowProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="mesh-panel rounded-[22px] border border-white/70 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            {metric.label}
          </p>
          <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}
