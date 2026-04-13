import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getCollegeBySlug, getUniversityBySlug, universities } from "@/data/study";
import { buildMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{ universitySlug: string; collegeSlug: string }>;
};

export async function generateStaticParams() {
  return universities.flatMap((university) =>
    university.colleges.map((college) => ({
      universitySlug: university.slug,
      collegeSlug: college.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { universitySlug, collegeSlug } = await params;
  const college = getCollegeBySlug(universitySlug, collegeSlug);
  const university = getUniversityBySlug(universitySlug);

  return buildMetadata({
    title: college ? `${college.name} - ${university?.shortName ?? "Study"}` : "College",
    description: college?.overview ?? "College detail page",
    path: `/study/universities/${universitySlug}/${collegeSlug}`,
  });
}

export default async function CollegeDetailPage({ params }: Props) {
  const { universitySlug, collegeSlug } = await params;
  const university = getUniversityBySlug(universitySlug);
  const college = getCollegeBySlug(universitySlug, collegeSlug);

  if (!university || !college) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="College detail"
        title={college.name}
        description={`${college.overview} This page keeps the structure clear: college first, then the majors inside it.`}
        actions={[
          { href: `/study/universities/${university.slug}`, label: "Back to university", variant: "ghost" },
          { href: "/study/major-advising", label: "Book advising", variant: "dark" },
        ]}
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 md:grid-cols-2">
          {college.majors.map((major, index) => (
            <Reveal key={major.slug} delay={index * 0.05}>
              <div className="surface-card rounded-[28px] p-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{major.name}</h2>
                <p className="mt-2 text-sm font-medium text-ink-muted">
                  {major.degree} · {major.duration}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{major.description}</p>
                <div className="mt-5 grid gap-3 text-sm text-ink-muted sm:grid-cols-2">
                  <div className="rounded-[22px] border border-border bg-surface-muted px-4 py-3">
                    <p className="font-semibold text-ink">Fees</p>
                    <p className="mt-1">{major.fees}</p>
                  </div>
                  <div className="rounded-[22px] border border-border bg-surface-muted px-4 py-3">
                    <p className="font-semibold text-ink">Review</p>
                    <p className="mt-1">{major.review}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <ButtonLink
                    href={`/study/universities/${university.slug}/${college.slug}/${major.slug}`}
                    variant="dark"
                  >
                    Explore major
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
