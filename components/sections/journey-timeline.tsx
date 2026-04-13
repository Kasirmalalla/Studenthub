import type { JourneyStep } from "@/data/types";

import { Reveal } from "@/components/ui/reveal";

type JourneyTimelineProps = {
  steps: JourneyStep[];
};

export function JourneyTimeline({ steps }: JourneyTimelineProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {steps.map((step, index) => (
        <Reveal key={step.phase + step.title} delay={index * 0.05}>
          <div className="surface-card h-full rounded-[30px] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                Phase {step.phase}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-brand/40 to-transparent" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-ink-muted">{step.description}</p>
            <p className="mt-4 rounded-[22px] border border-border bg-surface-muted px-4 py-4 text-sm leading-7 text-ink">
              {step.detail}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
