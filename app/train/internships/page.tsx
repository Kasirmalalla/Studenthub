import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { internships } from "@/data/train";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Internships",
  description: "Browse internship opportunities for students and fresh graduates.",
  path: "/train/internships",
});

export default function InternshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Train / Internships"
        title="Work exposure that helps close the gap between learning and employability."
        description="The internship UI is designed to help students and fresh graduates scan opportunities by field, location, and employer context."
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 md:grid-cols-2">
          {internships.map((internship, index) => (
            <Reveal key={internship.slug} delay={index * 0.05}>
              <div className="surface-card rounded-[28px] p-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {internship.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-ink-muted">
                  {internship.company} · {internship.location} · {internship.duration}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{internship.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-border bg-surface-muted px-3 py-2 text-xs font-medium text-ink">
                    {internship.field}
                  </span>
                </div>
                <div className="mt-6">
                  <ButtonLink href={`/train/internships/${internship.slug}`} variant="dark">
                    View internship
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
