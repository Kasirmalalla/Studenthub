import { buildMetadata } from "@/lib/utils";
import { getWorkSummary } from "@/lib/catalog";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { RouteCard } from "@/components/ui/route-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { workArchitecture } from "@/data/site";

export const metadata = buildMetadata({
  title: "Work",
  description: "Apply for jobs, improve CVs, and move into employment with more confidence and structure.",
  path: "/work",
});

const workSummary = getWorkSummary();

const workMetrics = [
  { label: "Jobs", value: `${workSummary.jobs} graduate-friendly openings` },
  { label: "CV experts", value: `${workSummary.cvExperts} service profiles` },
  { label: "Interview visibility", value: "Placeholder scheduling flow" },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work phase"
        title="Move from readiness into real opportunities."
        description="The Work phase helps fresh graduates apply for jobs, improve their CVs, and gain more visibility into what happens after they submit an application."
        metrics={workMetrics}
        actions={[
          { href: "/work/jobs", label: "Apply for a job", variant: "primary" },
          { href: "/work/cv-making", label: "Explore CV making", variant: "dark" },
        ]}
      />

      <section className="section-wrap pt-0">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Work architecture"
            title="Two focused routes support the move into employment."
            description="The Work phase is intentionally simple at the top level: opportunity discovery and career-document support. Together, they create a clearer employment transition."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {workArchitecture.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.05}>
                <RouteCard item={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Apply with more clarity",
              copy: "Job pages frame role expectations, language needs, and application details clearly so the next step feels visible.",
            },
            {
              title: "See the next step",
              copy: "The interview-booking placeholder demonstrates how Student Hub can later reduce silence after an application is submitted.",
            },
            {
              title: "Improve the CV first",
              copy: "Professional service positioning keeps resume improvement visible as a serious employability tool, not a side feature.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="surface-card rounded-[28px] p-6">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
