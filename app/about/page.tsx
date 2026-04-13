import { Flag, Globe2, Milestone, Target } from "lucide-react";

import { founder, roadmap } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn what Student Hub is, why it exists, and how the three-phase journey is designed to work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Student Hub"
        title="A founder-led platform built to make education and career decisions feel more structured."
        description="Student Hub exists because too many students and fresh graduates move through major decisions, skill-building, and job searching without enough connected guidance. The platform is designed to close those gaps."
        actions={[
          { href: "/study", label: "Explore the Study phase", variant: "primary" },
          { href: "/contact", label: "Contact Student Hub", variant: "ghost" },
        ]}
        aside={
          <div className="surface-card rounded-[32px] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">The problem</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-ink-muted">
              <li>Students choose majors with limited structure or visibility.</li>
              <li>Training opportunities are often fragmented and difficult to compare.</li>
              <li>Graduates need better support moving from readiness into real jobs.</li>
            </ul>
          </div>
        }
      />

      <section className="section-wrap">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">Mission</h2>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                Help people make smarter academic and career decisions by connecting study guidance,
                practical training, and employability support in one coherent platform.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                <Globe2 className="h-6 w-6" />
              </div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">Vision</h2>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                Start in Bahrain with high local relevance, then grow into a wider GCC platform that
                keeps academic and employability guidance clear, practical, and trustworthy.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              eyebrow="How the model works"
              title="Student Hub connects three phases that are usually treated separately."
              description="The platform is intentionally structured around a progression: first choose wisely, then build practical readiness, then move into employment with more support and visibility."
            />
          </Reveal>
          <div className="grid gap-4">
            {[
              {
                icon: Milestone,
                title: "Study",
                copy: "University discovery, university comparison, Bahrain market awareness, and major advising help users make better early choices.",
              },
              {
                icon: Flag,
                title: "Train",
                copy: "Courses, internships, workshops, and Tamkeen-supported programs help students gain practical capability before applying for work.",
              },
              {
                icon: Globe2,
                title: "Work",
                copy: "Job listings, CV services, and interview-booking concepts help graduates move into work with stronger preparation.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="surface-card rounded-[28px] p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Why Bahrain first</p>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                Starting in Bahrain keeps the product grounded in a specific academic and employment
                context. That focus makes the first version more useful, more credible, and easier to
                refine with local needs in mind.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Long-term ambition</p>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                The structure is designed to scale to the GCC and beyond by expanding university data,
                training partnerships, employer pathways, and localized service layers.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Roadmap"
            title="A simple path from launch to regional growth."
            description="Student Hub is positioned as a serious startup platform in progress, not a finished marketplace. The roadmap below outlines how the product can deepen over time."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {roadmap.map((item, index) => (
              <Reveal key={item.phase} delay={index * 0.05}>
                <div className="surface-card rounded-[28px] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">{item.phase}</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap pt-0">
        <Container>
          <Reveal>
            <div className="surface-card rounded-[32px] p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Founder</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">{founder.name}</h2>
              <p className="mt-2 text-sm font-medium text-ink-muted">{founder.title}</p>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-ink-muted">{founder.bio}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {founder.focus.map((item) => (
                  <span key={item} className="rounded-full border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-ink">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="dark">
                  Contact Student Hub
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
