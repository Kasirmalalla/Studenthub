import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getUniversityBySlug, universities } from "@/data/study";
import { buildMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{ universitySlug: string }>;
};

export async function generateStaticParams() {
  return universities.map((university) => ({ universitySlug: university.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { universitySlug } = await params;
  const university = getUniversityBySlug(universitySlug);

  if (!university) {
    return buildMetadata({
      title: "University",
      description: "University detail page",
      path: `/study/universities/${universitySlug}`,
    });
  }

  return buildMetadata({
    title: university.name,
    description: university.overview,
    path: `/study/universities/${universitySlug}`,
  });
}

export default async function UniversityDetailPage({ params }: Props) {
  const { universitySlug } = await params;
  const university = getUniversityBySlug(universitySlug);

  if (!university) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="University detail"
        title={university.name}
        description={`${university.overview} ${university.tagline}`}
        actions={[
          { href: "/study/comparison", label: "Compare options", variant: "ghost" },
          { href: "/study/major-advising", label: "Book advising", variant: "dark" },
        ]}
        aside={
          <div className="surface-card rounded-[32px] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Summary info</p>
            <div className="mt-5 grid gap-4">
              {university.stats.map((stat) => (
                <div key={stat.label} className="rounded-[24px] border border-border bg-surface-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                    {stat.value}
                  </p>
                </div>
              ))}
              <div className="rounded-[24px] border border-border bg-surface-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Fees</p>
                <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                  {university.tuitionBand}
                </p>
              </div>
            </div>
          </div>
        }
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 md:grid-cols-2">
          {university.colleges.map((college, index) => (
            <Reveal key={college.slug} delay={index * 0.05}>
              <div className="surface-card rounded-[28px] p-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{college.name}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{college.overview}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {college.majors.map((major) => (
                    <span
                      key={major.slug}
                      className="rounded-full border border-border bg-surface-muted px-3 py-2 text-xs font-medium text-ink"
                    >
                      {major.name}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <ButtonLink
                    href={`/study/universities/${university.slug}/${college.slug}`}
                    variant="dark"
                  >
                    Explore majors
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
