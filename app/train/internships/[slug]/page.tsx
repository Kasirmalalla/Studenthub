import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getInternshipBySlug, internships } from "@/data/train";
import { buildMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return internships.map((internship) => ({ slug: internship.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const internship = getInternshipBySlug(slug);
  return buildMetadata({
    title: internship?.title ?? "Internship",
    description: internship?.description ?? "Internship detail page",
    path: `/train/internships/${slug}`,
  });
}

export default async function InternshipDetailPage({ params }: Props) {
  const { slug } = await params;
  const internship = getInternshipBySlug(slug);

  if (!internship) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Train / Internship detail"
        title={internship.title}
        description={`${internship.description} This page helps students understand the field, employer context, and expected contribution before applying.`}
        actions={[{ href: "/train/internships", label: "Back to internships", variant: "ghost" }]}
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="surface-card rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Overview</h2>
            <div className="mt-5 grid gap-4 text-sm text-ink-muted">
              <p><span className="font-semibold text-ink">Company:</span> {internship.company}</p>
              <p><span className="font-semibold text-ink">Field:</span> {internship.field}</p>
              <p><span className="font-semibold text-ink">Location:</span> {internship.location}</p>
              <p><span className="font-semibold text-ink">Duration:</span> {internship.duration}</p>
            </div>
          </div>
          <div className="surface-card rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Expectations</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-muted">
              {internship.expectations.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href="/contact" variant="dark">
                Apply now
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
