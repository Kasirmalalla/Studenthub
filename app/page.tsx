import {
  ArrowRight,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  Lightbulb,
  Rocket,
  Sparkles,
} from "lucide-react";

import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { RouteCard } from "@/components/ui/route-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatGrid } from "@/components/ui/stat-grid";
import { isPhaseEnabled } from "@/data/feature-flags";
import {
  featurePreviews,
  founder,
  homeHeroMetrics,
  homeStats,
  journeySteps,
  phases,
  platformPrinciples,
  studyArchitecture,
  trainArchitecture,
  workArchitecture,
} from "@/data/site";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "Student Hub is a Bahrain-first platform guiding students and fresh graduates through study, training, and work.",
  path: "/",
});

const studyOnlyRollout = !isPhaseEnabled("train") && !isPhaseEnabled("work");

const featuredRoutes = [
  studyArchitecture[0],
  studyArchitecture[1],
  ...(isPhaseEnabled("train") ? [trainArchitecture[1], trainArchitecture[4]] : []),
  ...(isPhaseEnabled("work") ? [workArchitecture[0], workArchitecture[1]] : []),
].filter(Boolean);

const phaseIcons = {
  study: GraduationCap,
  train: Rocket,
  work: BriefcaseBusiness,
};

const whyItems = [
  {
    icon: Compass,
    title: "Clarity before commitment",
    copy: "University browsing, comparison, market context, and advising reduce guesswork before students lock into a path.",
  },
  ...(isPhaseEnabled("train")
    ? [
        {
          icon: Lightbulb,
          title: "Practical capability in the middle",
          copy: "Courses, internships, workshops, and supported programs make students more employable before they apply for work.",
        },
      ]
    : []),
  ...(isPhaseEnabled("work")
    ? [
        {
          icon: Sparkles,
          title: "A more visible move into work",
          copy: "Job pages, CV services, and interview-booking concepts replace silent waiting with clearer action.",
        },
      ]
    : []),
  ...(!isPhaseEnabled("train") || !isPhaseEnabled("work")
    ? [
        {
          icon: Rocket,
          title: "Future phases are already planned",
          copy: "Train and Work are temporarily hidden from the public experience while Student Hub deepens the Study phase first.",
        },
      ]
    : []),
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Student Hub"
        title="A beginning of a successful career, built as a structured journey."
        description={
          studyOnlyRollout
            ? "Student Hub is launching with Study first. Users can already explore universities, compare majors, understand Bahrain market context, and book advising while the Train and Work phases are being refined for a later public release."
            : "Student Hub helps students and fresh graduates move through one connected path: choose the right academic direction, build practical readiness through training, and move into work with stronger support."
        }
        metrics={homeHeroMetrics}
        actions={[
          { href: "/study", label: "Explore Study", variant: "primary" },
          { href: "/book-online", label: "Book Advising", variant: "dark" },
          {
            href: isPhaseEnabled("work") ? "/work/jobs" : "/study/comparison",
            label: isPhaseEnabled("work") ? "View Opportunities" : "Compare Options",
            variant: "ghost",
          },
        ]}
        aside={
          <div className="surface-card-dark ink-grid rounded-[34px] p-6 text-white sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                  Product snapshot
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  Premium, clear, Bahrain-first.
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/74">
                {studyOnlyRollout ? "Study-first release" : "MVP frontend"}
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {phases.map((phase, index) => (
                <div key={phase.slug} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                        Step 0{index + 1}
                      </p>
                      <span className="mt-2 block text-lg font-semibold text-white">
                        {phase.name}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-brand" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    {phase.highlight}
                  </p>
                </div>
              ))}
              {studyOnlyRollout ? (
                <div className="rounded-[24px] border border-brand/25 bg-brand/10 p-5 text-sm leading-7 text-white/84">
                  Train and Work are temporarily hidden from the public experience
                  while Study is refined first.
                </div>
              ) : null}
            </div>
          </div>
        }
      />

      <section className="section-wrap pt-2">
        <Container>
          <Reveal>
            <StatGrid stats={homeStats} />
          </Reveal>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow={studyOnlyRollout ? "Current focus" : "Three-phase model"}
            title={
              studyOnlyRollout
                ? "The public release is focused on Study first."
                : "One connected product instead of a disconnected set of decisions."
            }
            description={
              studyOnlyRollout
                ? "Student Hub is intentionally narrowing the first release around stronger academic decisions before the Train and Work phases are reopened publicly."
                : "Student Hub is shaped as a journey platform. Each phase solves a different problem, but the real value is how the phases connect."
            }
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {phases.map((phase, index) => {
              const PhaseIcon = phaseIcons[phase.slug];
              return (
                <Reveal key={phase.slug} delay={index * 0.05}>
                  <div className="surface-card rounded-[30px] p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                      <PhaseIcon className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                      {phase.kicker}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                      {phase.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-ink-muted">
                      {phase.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Journey logic"
            title={
              studyOnlyRollout
                ? "The first release is concentrated on stronger early decisions."
                : "How Student Hub turns confusion into progress."
            }
            description={
              studyOnlyRollout
                ? "The current public rollout is focused on helping students choose more confidently before additional phases return."
                : "The product experience is built around a sequence: understand options, build capability, then move into work with more visibility and better tools."
            }
          />
          <JourneyTimeline steps={journeySteps} />
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Platform architecture"
            title="A stronger first version of the product starts with clear architecture."
            description={
              studyOnlyRollout
                ? "The codebase still holds the wider Train and Work architecture, but the public experience is currently narrowed to Study-focused routes."
                : "These routes are designed as reusable product layers, not one-off landing sections. That keeps the codebase cleaner today and easier to connect to real backend data later."
            }
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredRoutes.map((route, index) => (
              <Reveal key={route.href} delay={index * 0.03}>
                <RouteCard item={route} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Why Student Hub"
              title="A bridge from education to employability, with structure at every stage."
              description="Many students choose a university or major without enough structure, then discover later that they need training, exposure, and career support. Student Hub is designed to connect those missing parts."
            />
          </Reveal>
          <div className="grid gap-4">
            {whyItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="surface-card rounded-[28px] p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="surface-card rounded-[32px] p-8 sm:p-10">
              <SectionHeading
                eyebrow="Product standards"
                title="A startup-quality product posture matters as much as the feature list."
                description="Student Hub is meant to feel supportive and optimistic, but also serious, structured, and professionally credible."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {platformPrinciples.map((principle) => (
                  <div key={principle.title} className="rounded-[24px] border border-border bg-surface-muted px-5 py-5">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-ink-muted">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card-dark rounded-[32px] p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                Founder
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">
                {founder.name}
              </h2>
              <p className="mt-2 text-sm text-white/70">{founder.title}</p>
              <p className="mt-5 text-sm leading-8 text-white/72">{founder.bio}</p>
              <div className="mt-6 grid gap-3">
                {founder.focus.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Feature preview"
            title={studyOnlyRollout ? "The current public release is centered on Study." : "The product already covers the journey from early research to career support."}
            description={
              studyOnlyRollout
                ? "These live feature areas show where Student Hub is focusing first while Train and Work stay behind a temporary rollout gate."
                : "These feature areas preview the breadth of the MVP without making the site feel cluttered."
            }
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featurePreviews.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.03}>
                <div className="surface-card rounded-[26px] p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap pt-0">
        <Container>
          <Reveal>
            <div className="surface-card-dark rounded-[34px] p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                Start the journey
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Student Hub is being shaped as a credible platform for Bahrain&apos;s next generation.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/72">
                {studyOnlyRollout
                  ? "Explore the Study phase, book advising, or contact Student Hub while the next phases are refined for a later public release."
                  : "Explore the Study, Train, and Work routes, book a service, or contact Student Hub to discuss partnerships and early interest."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/study" variant="primary">
                  Explore the platform
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost">
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