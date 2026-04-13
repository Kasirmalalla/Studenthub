import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getMajorBySlug, getUniversityBySlug, universities } from "@/data/study";
import { buildMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{ universitySlug: string; collegeSlug: string; majorSlug: string }>;
};

export async function generateStaticParams() {
  return universities.flatMap((university) =>
    university.colleges.flatMap((college) =>
      college.majors.map((major) => ({
        universitySlug: university.slug,
        collegeSlug: college.slug,
        majorSlug: major.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: Props) {
  const { universitySlug, collegeSlug, majorSlug } = await params;
  const major = getMajorBySlug(universitySlug, collegeSlug, majorSlug);

  return buildMetadata({
    title: major?.name ?? "Major",
    description: major?.description ?? "Major detail page",
    path: `/study/universities/${universitySlug}/${collegeSlug}/${majorSlug}`,
  });
}

export default async function MajorDetailPage({ params }: Props) {
  const { universitySlug, collegeSlug, majorSlug } = await params;
  const university = getUniversityBySlug(universitySlug);
  const major = getMajorBySlug(universitySlug, collegeSlug, majorSlug);

  if (!university || !major) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Major detail"
        title={major.name}
        description={`${major.description} Student Hub frames majors with academic and career-facing context to help users choose more carefully.`}
        actions={[
          { href: "/study/comparison", label: "Compare majors", variant: "ghost" },
          { href: "/study/major-advising", label: "Book advising", variant: "dark" },
        ]}
        aside={
          <div className="surface-card rounded-[32px] p-6 sm:p-8">
            <div className="grid gap-4">
              <div className="rounded-[24px] border border-border bg-surface-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">University</p>
                <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">{university.name}</p>
              </div>
              <div className="rounded-[24px] border border-border bg-surface-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Degree</p>
                <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                  {major.degree} · {major.duration}
                </p>
              </div>
              <div className="rounded-[24px] border border-border bg-surface-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Fees</p>
                <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">{major.fees}</p>
              </div>
            </div>
          </div>
        }
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card rounded-[28px] p-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Requirements</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-muted">
                {major.requirements.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="surface-card rounded-[28px] p-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Academic plan</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-muted">
                {major.academicPlan.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="surface-card rounded-[28px] p-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Reviews</h2>
              <p className="mt-4 text-sm leading-7 text-ink-muted">{major.review}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="surface-card rounded-[28px] p-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Job opportunities</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-muted">
                {major.jobOpportunities.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-ink-muted">{major.careerOutlook}</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
