import { buildMetadata } from "@/lib/utils";
import { getTrainSummary } from "@/lib/catalog";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { RouteCard } from "@/components/ui/route-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { trainArchitecture } from "@/data/site";

export const metadata = buildMetadata({
  title: "Train",
  description: "Explore institutions, internships, courses, Tamkeen-supported programs, and workshops.",
  path: "/train",
});

const trainSummary = getTrainSummary();

const trainMetrics = [
  { label: "Courses", value: `${trainSummary.courses} structured listings` },
  { label: "Internships", value: `${trainSummary.internships} opportunity cards` },
  { label: "Workshops", value: `${trainSummary.workshops} bookable sessions` },
  { label: "Programs", value: `${trainSummary.tamkeenPrograms} supported routes` },
];

export default function TrainPage() {
  return (
    <>
      <PageHero
        eyebrow="Train phase"
        title="Build practical readiness before entering the job market."
        description="The Train phase connects students and fresh graduates to courses, internships, workshops, and Tamkeen-supported opportunities that help turn academic knowledge into usable capability."
        metrics={trainMetrics}
        actions={[
          { href: "/train/institutions-internships", label: "View institutions and internships", variant: "primary" },
          { href: "/train/workshops", label: "Explore workshops", variant: "dark" },
        ]}
      />

      <section className="section-wrap pt-0">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Train architecture"
            title="A stronger middle layer between study and work."
            description="The Train phase is designed as a capability-building system, not just a list of opportunities. It connects skill growth, exposure, and supported pathways."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {trainArchitecture.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.04}>
                <RouteCard item={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Practical value</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
                Skill-building needs more than course discovery alone.
              </h2>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                Student Hub positions training as a mix of structured learning, supported access, and
                real-world exposure so students can become more employable before they begin applying.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Backend-ready structure</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
                The route system is ready for later provider and availability integrations.
              </h2>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                Courses, internships, programs, and workshops are already modeled as reusable data sets
                with clean detail routes, making future CMS or partner-driven connections easier.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
