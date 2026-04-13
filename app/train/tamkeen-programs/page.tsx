import { Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { tamkeenPrograms } from "@/data/train";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Tamkeen Programs",
  description: "Browse clean listing cards for Tamkeen-supported opportunities.",
  path: "/train/tamkeen-programs",
});

export default function TamkeenProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Train / Tamkeen programs"
        title="Supported pathways that can lower access barriers and improve readiness."
        description="This section introduces the value of supported programs while keeping the opportunity list clean, practical, and easy to scan."
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 md:grid-cols-2">
          {tamkeenPrograms.map((program, index) => (
            <Reveal key={program.slug} delay={index * 0.05}>
              <div className="surface-card rounded-[28px] p-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{program.title}</h2>
                <p className="mt-2 text-sm font-medium text-ink-muted">
                  {program.provider} · {program.format}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{program.summary}</p>
                <div className="mt-5 rounded-[22px] border border-brand/20 bg-brand/10 px-4 py-3 text-sm text-ink">
                  {program.support}
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white"
                >
                  <Send className="h-4 w-4 text-brand" />
                  Apply now
                </button>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
