import { Building2 } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { universities } from "@/data/study";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Universities",
  description: "Browse Bahrain universities and explore the university > college > major structure.",
  path: "/study/universities",
});

export default function UniversitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Study / Universities"
        title="Browse Bahrain universities through a structure designed to scale."
        description="Each university links into colleges or faculties, and then into major pages with academic, financial, and career-facing details."
      />
      <section className="section-wrap pt-0">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="University directory"
            title="Realistic Bahrain-focused mock data for the MVP."
            description="These entries are placeholders designed to demonstrate product structure and future expansion into the GCC."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {universities.map((university, index) => (
              <Reveal key={university.slug} delay={index * 0.03}>
                <div className="surface-card rounded-[28px] p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {university.name}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-ink-muted">{university.location}</p>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{university.overview}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {university.stats.map((stat) => (
                      <span
                        key={stat.label}
                        className="rounded-full border border-border bg-surface-muted px-3 py-2 text-xs font-medium text-ink"
                      >
                        {stat.value}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <ButtonLink href={`/study/universities/${university.slug}`} variant="dark">
                      Explore university
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
