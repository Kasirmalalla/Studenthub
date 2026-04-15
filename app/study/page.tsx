import { buildMetadata } from "@/lib/utils";
import { getStudySummary } from "@/lib/catalog";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { RouteCard } from "@/components/ui/route-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { studyArchitecture } from "@/data/site";

export const metadata = buildMetadata({
  title: "Study",
  description:
    "Explore universities, compare study options, review market needs, take a major match test, and book major advising.",
  path: "/study",
});

const studySummary = getStudySummary();

const studyMetrics = [
  { label: "Universities", value: `${studySummary.universities} Bahrain profiles` },
  { label: "Majors", value: `${studySummary.majors} academic options` },
  { label: "Advisors", value: `${studySummary.advisors} advising profiles` },
  { label: "Major match", value: "RIASEC-style test" },
];

export default function StudyPage() {
  return (
    <>
      <PageHero
        eyebrow="Study phase"
        title="Choose the right academic path with more structure and better visibility."
        description="The Study phase helps students explore universities, compare majors, understand Bahrain market signals, take a major match test, and book advising before they commit to a path."
        metrics={studyMetrics}
        actions={[
          { href: "/study/psychometric-test", label: "Start Test", variant: "primary" },
          { href: "/study/universities", label: "Browse universities", variant: "ghost" },
          { href: "/study/comparison", label: "Compare options", variant: "ghost" },
        ]}
      />

      <section className="section-wrap pt-0">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Study architecture"
            title="Five product routes shape the Study experience."
            description="Each route exists to reduce uncertainty early, before a student commits to a university or major that may not fit their interests, goals, or preferred way of working."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {studyArchitecture.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.05}>
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
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Why this matters
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
                The right major decision should feel informed, not accidental.
              </h2>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                Student Hub treats study choice as the start of a career journey. That is why the Study phase combines university discovery, side-by-side comparison, major-fit guidance, market awareness, and paid advising instead of leaving them separate.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Designed to scale
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
                Bahrain-first today, GCC-ready tomorrow.
              </h2>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                The directory and recommendation structures already use reusable data patterns so the same model can later support GCC universities, richer filtering, and live academic data.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}