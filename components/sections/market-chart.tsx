import type { MarketInsight } from "@/data/types";

type MarketChartProps = {
  insights: MarketInsight[];
};

export function MarketChart({ insights }: MarketChartProps) {
  return (
    <div className="surface-card rounded-[32px] p-6 sm:p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">MVP demo insights</p>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Bahrain market awareness
        </h3>
      </div>
      <div className="mt-8 space-y-5">
        {insights.map((insight) => (
          <div key={insight.field} className="grid gap-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-ink">{insight.field}</span>
              <span className="text-ink-muted">{insight.score}/100</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand-soft"
                style={{ width: `${insight.score}%` }}
              />
            </div>
            <p className="text-sm leading-7 text-ink-muted">{insight.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
