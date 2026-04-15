import {
  ArrowLeftRight,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  GraduationCap,
  LineChart,
  Rocket,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { RouteCard } from "@/components/ui/route-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatGrid } from "@/components/ui/stat-grid";
import { advisors, marketInsights, universities } from "@/data/study";
import { isPhaseEnabled } from "@/data/feature-flags";
import {
  founder,
  homeHeroMetrics,
  homeStats,
  studyArchitecture,
  trainArchitecture,
  workArchitecture,
} from "@/data/site";
import { getStudySummary } from "@/lib/catalog";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "Student Hub is currently launching with Study first, helping students test major fit, compare universities, review majors, and book advising in Bahrain.",
  path: "/",
});

const studyOnlyRollout = !isPhaseEnabled("train") && !isPhaseEnabled("work");
const studySummary = getStudySummary();

const routeHighlights = studyOnlyRollout
  ? studyArchitecture
  : [
      studyArchitecture[0],
      studyArchitecture[1],
      trainArchitecture[1],
      workArchitecture[0],
    ].filter(Boolean);

const trustSignals = studyOnlyRollout
  ? [
      {
        icon: Building2,
        label: "Structured data",
        value: `${studySummary.universities} universities / ${studySummary.colleges} colleges`,
        detail: "The live Study release already follows a university to college to major structure instead of a flat directory.",
      },
      {
        icon: ArrowLeftRight,
        label: "Decision support",
        value: `${studySummary.majors} majors ready to compare`,
        detail: "Users can compare universities and majors side by side rather than opening scattered pages and guessing the differences.",
      },
      {
        icon: CalendarDays,
        label: "Human help",
        value: `${studySummary.advisors} advisors bookable now`,
        detail: "Advising is already positioned as a visible paid service, which makes the experience feel more practical and real.",
      },
    ]
  : [
      {
        icon: GraduationCap,
        label: "Study",
        value: "Academic direction",
        detail: "University discovery, comparison, and advising give the journey a stronger starting point.",
      },
      {
        icon: Rocket,
        label: "Train",
        value: "Practical readiness",
        detail: "Courses, internships, and workshops are structured to build experience before job searching begins.",
      },
      {
        icon: BriefcaseBusiness,
        label: "Work",
        value: "Employment support",
        detail: "Jobs, CV help, and interview visibility make the move into work more guided.",
      },
    ];

const studyLaunchJourney = [
  {
    phase: "01",
    icon: BrainCircuit,
    title: "Start with a major-fit signal",
    description:
      "Use the Major Match Test to see which broad study directions fit interests and preferences before browsing randomly.",
    detail:
      "The test gives students a clearer first filter without pretending to make the final decision for them.",
  },
  {
    phase: "02",
    icon: Building2,
    title: "Explore Bahrain universities with structure",
    description:
      "Move into a guided university, college, and major hierarchy so the decision feels navigable instead of overwhelming.",
    detail:
      "This turns early browsing into something closer to a real product workflow than a static directory.",
  },
  {
    phase: "03",
    icon: ArrowLeftRight,
    title: "Compare study paths before committing",
    description:
      "Use the comparison tool and market context to evaluate two academic directions side by side.",
    detail:
      "Students can move from broad interest to narrower decisions without leaving the platform.",
  },
  {
    phase: "04",
    icon: CalendarDays,
    title: "Book advising when uncertainty remains",
    description:
      "When questions still feel personal or high-stakes, the booking layer gives users a visible human next step.",
    detail:
      "That makes the Study phase feel practical today, not just promising for later.",
  },
];

const featuredUniversities = universities.slice(0, 3);
const featuredAdvisors = advisors.slice(0, 2);
const marketHighlights = marketInsights.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Student Hub"
        title="A beginning of a successful career, shaped as a practical study-first launch."
        description={
          studyOnlyRollout
            ? "Student Hub is publicly launching with Study first. Students can already explore universities, compare majors, review Bahrain market context, take the Major Match Test, and book advising while Train and Work continue behind the next rollout layer."
            : "Student Hub helps students and fresh graduates move through one connected path: choose the right academic direction, build practical readiness through training, and move into work with stronger support."
        }
        metrics={homeHeroMetrics}
        actions={[
          { href: "/book-online", label: "Book advising", variant: "primary" },
          { href: "/study/psychometric-test", label: "Start Major Match Test", variant: "ghost" },
          { href: "/study/universities", label: "Browse universities", variant: "ghost" },
        ]}
        aside={
          <div className="rounded-[34px] border border-white/10 bg-[#171717] p-6 text-white shadow-[0_28px_64px_rgba(17,17,17,0.26)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                  Live now in Bahrain
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
                  Study is the public release.
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/82">
                {studyOnlyRollout ? "Study-first" : "Full journey"}
              </div>
            </div>
            <div className="mt-8 grid gap-3">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  University directory
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {studySummary.universities} Bahrain profiles
                </p>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Structured from university to college to major.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Advising access
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {studySummary.advisors} bookable specialists
                </p>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Paid advising is visible as part of the live flow, not hidden behind launch copy.
                </p>
              </div>
              {studyOnlyRollout ? (
                <div className="rounded-[24px] border border-brand/25 bg-brand/10 p-5 text-sm leading-7 text-white/82">
                  Train and Work stay in the roadmap, but the public experience is intentionally focused on stronger academic decisions first.
                </div>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/book-online" variant="primary">
                Book advising now
              </ButtonLink>
              <ButtonLink href="/study/psychometric-test" variant="ghost" className="!text-ink">
                Start Major Match Test
              </ButtonLink>
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
            eyebrow={studyOnlyRollout ? "Live now" : "Phase architecture"}
            title={
              studyOnlyRollout
                ? "Study is shipping as a complete first release, not just a teaser."
                : "The platform is structured as connected product layers, not disconnected pages."
            }
            description={
              studyOnlyRollout
                ? "Instead of hinting at future value only, the current release already gives students five practical tools they can use today."
                : "Student Hub is designed so each phase solves a specific problem while still feeling part of one journey."
            }
          />
          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <Reveal>
              <div className="surface-card rounded-[32px] p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Current public focus
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
                  The launch experience is shaped around better early decisions.
                </h2>
                <p className="mt-4 text-sm leading-8 text-ink-muted">
                  Student Hub is narrowing the public rollout on purpose: take the Major Match Test, browse universities, compare paths, review market context, and book advising before the later phases reopen.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="rounded-[22px] border border-border bg-surface-muted px-4 py-4 text-sm leading-7 text-ink">
                    University-to-major navigation gives the directory real structure.
                  </div>
                  <div className="rounded-[22px] border border-border bg-surface-muted px-4 py-4 text-sm leading-7 text-ink">
                    Comparison and market context reduce guesswork before users commit.
                  </div>
                  <div className="rounded-[22px] border border-border bg-surface-muted px-4 py-4 text-sm leading-7 text-ink">
                    Advising is already presented like a visible premium service, which strengthens trust.
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/study" variant="primary">
                    Explore Study
                  </ButtonLink>
                  <ButtonLink href="/book-online" variant="ghost" className="!text-ink">
                    Book advising
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {routeHighlights.map((route, index) => (
                <Reveal key={route.href} delay={index * 0.04}>
                  <RouteCard item={route} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="How it works"
            title={
              studyOnlyRollout
                ? "A student can move from uncertainty to a clearer next step in one flow."
                : "The product journey is designed to turn uncertainty into momentum."
            }
            description={
              studyOnlyRollout
                ? "The current release is intentionally practical: discover options, compare them properly, then book help if the decision still feels unclear."
                : "The platform is designed as a sequence of decisions, capability-building, and career support rather than isolated feature pages."
            }
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {studyLaunchJourney.map((step, index) => (
              <Reveal key={step.phase} delay={index * 0.05}>
                <div className="surface-card h-full rounded-[30px] p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                      Step {step.phase}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{step.description}</p>
                  <p className="mt-4 rounded-[22px] border border-border bg-surface-muted px-4 py-4 text-sm leading-7 text-ink">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <div className="surface-card rounded-[32px] p-8 sm:p-10">
              <SectionHeading
                eyebrow="Why this feels practical"
                title="The product already does enough to feel useful, not just aspirational."
                description="From a user perspective, Student Hub is strongest when it behaves like a guided decision platform instead of a collection of future promises."
              />
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustSignals.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <div className="surface-card rounded-[28px] p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                    {item.label}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{item.detail}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <div className="surface-card-dark rounded-[28px] p-6 text-white sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Founder-led direction
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  {founder.name}
                </h3>
                <p className="mt-2 text-sm text-white/72">{founder.title}</p>
                <p className="mt-4 text-sm leading-8 text-white/76">{founder.bio}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {founder.focus.map((item) => (
                    <div
                      key={item}
                      className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Bahrain-first foundation"
            title="The launch already has a local shape instead of generic startup filler."
            description="Student Hub feels more credible when users can see real Bahrain-facing university coverage, advising profiles, and practical market framing in one place."
          />
          <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5 md:grid-cols-3">
              {featuredUniversities.map((university, index) => (
                <Reveal key={university.slug} delay={index * 0.04}>
                  <div className="surface-card h-full rounded-[28px] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                      {university.type}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                      {university.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-ink-muted">{university.location}</p>
                    <p className="mt-3 text-sm leading-7 text-ink-muted">{university.tagline}</p>
                    <p className="mt-5 text-sm font-medium text-ink">{university.tuitionBand}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.08}>
              <div className="surface-card rounded-[32px] p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                      Decision support signals
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                      Market context and advising are both visible.
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                    <LineChart className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {marketHighlights.map((item) => (
                    <div key={item.field}>
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="font-medium text-ink">{item.field}</span>
                        <span className="text-ink-muted">{item.score}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-surface-muted">
                        <div
                          className="h-full rounded-full bg-brand"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[24px] border border-border bg-surface-muted px-5 py-5">
                  <p className="text-sm font-semibold text-ink">Advisor highlights</p>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-ink-muted">
                    {featuredAdvisors.map((advisor) => (
                      <p key={advisor.slug}>
                        {advisor.name} - {advisor.title}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/study/major-advising" variant="primary">
                    View advisors
                  </ButtonLink>
                  <ButtonLink href="/study/market-needs" variant="ghost">
                    Review market needs
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
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
                Student Hub is already useful when the goal is making a stronger academic decision.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/74">
                Explore the Study phase, compare universities and majors, or book advising while the next public release is still being refined.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/study" variant="primary">
                  Explore Study
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