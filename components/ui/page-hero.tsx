import type { ReactNode } from "react";

import { ArrowRight } from "lucide-react";

import type { HeroMetric } from "@/data/types";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroMetricRow } from "@/components/ui/hero-metric-row";
import { cn } from "@/lib/utils";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "dark" | "ghost";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  aside?: ReactNode;
  metrics?: HeroMetric[];
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  aside,
  metrics = [],
  className,
}: PageHeroProps) {
  return (
    <section className={cn("section-wrap brand-glow pt-10 sm:pt-14", className)}>
      <div className="section-grid grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <Reveal className="space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
              <span className="h-2 w-2 rounded-full bg-brand" />
              {eyebrow}
            </div>
            <h1 className="headline-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="copy-balance max-w-2xl text-base leading-8 text-ink-muted sm:text-lg">
              {description}
            </p>
          </div>
          {metrics.length ? <HeroMetricRow metrics={metrics} /> : null}
          {actions.length ? (
            <div className="flex flex-wrap gap-3">
              {actions.map((action) => (
                <ButtonLink key={action.href + action.label} href={action.href} variant={action.variant}>
                  {action.label}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </Reveal>
        {aside ? <Reveal delay={0.08}>{aside}</Reveal> : null}
      </div>
    </section>
  );
}
