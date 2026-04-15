import { BrainCircuit, Compass, ShieldCheck } from "lucide-react";

import { MajorMatchTest } from "@/components/forms/major-match-test";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Take a Psychometric Test",
  description:
    "Take Student Hub's Major Match Test to explore bachelor-level majors based on RIASEC-style interests and study preferences.",
  path: "/study/psychometric-test",
});

export default function PsychometricTestPage() {
  return (
    <>
      <PageHero
        eyebrow="Study / Major Match Test"
        title="Find your best-fit major with a structured interest and preference test."
        description="This Study tool helps high school students and prospective bachelor students explore major directions using career-interest patterns, preference signals, and transparent matching logic."
        actions={[
          { href: "#major-match-test", label: "Start Test", variant: "primary" },
          { href: "/study/major-advising", label: "Talk to an advisor", variant: "ghost" },
        ]}
        aside={
          <div className="surface-card rounded-[32px] p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink">
              Guidance, not diagnosis.
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-muted">
              The test is framed as a major exploration tool. It does not label students clinically or make final decisions for them.
            </p>
          </div>
        }
      />

      <section className="section-wrap pt-0">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="How it works"
            title="A clearer starting point for students who are unsure what to study."
            description="The flow combines RIASEC-style interest matching with practical preference signals so recommendations stay explainable and useful for advising conversations."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <Reveal>
              <div className="surface-card rounded-[28px] p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                  <Compass className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Interest fit
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                  Based on six career-interest areas
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">
                  The test uses Realistic, Investigative, Artistic, Social, Enterprising, and Conventional patterns as the core matching layer.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="surface-card rounded-[28px] p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Preference fit
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                  Adds study and work-style signals
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">
                  Preference questions help separate similar paths, such as technical, people-facing, creative, structured, or analytical majors.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="surface-card rounded-[28px] p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Transparent results
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                  Shows why each major appears
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">
                  Every recommendation includes matching traits and a suggested next step so students can explore, compare, or book advising.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-wrap pt-0">
        <Container>
          <MajorMatchTest />
        </Container>
      </section>

      <section className="section-wrap pt-0">
        <Container>
          <Reveal>
            <div className="surface-card-dark rounded-[32px] p-7 text-white sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                Need help interpreting results?
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight">
                A test result is strongest when paired with curriculum research and advising.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/74">
                Use your results to ask better questions, compare requirements, and identify which majors deserve deeper review before applying.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/study/universities" variant="primary">
                  Browse universities
                </ButtonLink>
                <ButtonLink href="/book-online" variant="ghost" className="!text-ink">
                  Book advising
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}