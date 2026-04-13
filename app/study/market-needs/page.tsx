import { MarketChart } from "@/components/sections/market-chart";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { marketInsights } from "@/data/study";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Bahrain Market Needs",
  description: "Placeholder market insight visuals to help students think about demand awareness.",
  path: "/study/market-needs",
});

export default function MarketNeedsPage() {
  return (
    <>
      <PageHero
        eyebrow="Study / Bahrain market needs"
        title="Help users think about majors with more awareness of demand."
        description="These visuals are clearly labeled as MVP demo insights. They are designed to show how Student Hub can eventually connect academic decisions with local market awareness."
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="surface-card rounded-[32px] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Important note</p>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                These charts use placeholder content for the MVP. The goal is not to make hard claims
                today, but to show how Student Hub can help students choose with more practical context.
              </p>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                Later versions can connect real data sources, labor-market research, and regional sector updates.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <MarketChart insights={marketInsights} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
