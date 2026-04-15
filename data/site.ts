import type {
  FAQ,
  FeaturePreview,
  Founder,
  HeroMetric,
  JourneyStep,
  NavItem,
  Phase,
  RouteHighlight,
  Stat,
} from "@/data/types";
import { isPhaseEnabled } from "@/data/feature-flags";

type PhaseTagged<T> = T & { phase?: Phase["slug"] };

const allNavItems: Array<PhaseTagged<NavItem>> = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Study", href: "/study", phase: "study" },
  { label: "Train", href: "/train", phase: "train" },
  { label: "Work", href: "/work", phase: "work" },
  { label: "Book Online", href: "/book-online" },
  { label: "Contact", href: "/contact" },
];

export const navItems: NavItem[] = allNavItems
  .filter((item) => !item.phase || isPhaseEnabled(item.phase))
  .map((item) => ({ label: item.label, href: item.href }));

export const footerLinks: NavItem[] = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/sign-up" },
  { label: "My Account", href: "/my-account" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Wallet", href: "/my-wallet" },
];

const allPhases: Phase[] = [
  {
    slug: "study",
    name: "Study",
    kicker: "Choose with clarity",
    description:
      "Support students and school graduates with university discovery, major selection, comparison tools, and Bahrain market awareness.",
    href: "/study",
    highlight: "Reduce academic confusion before it becomes career drift.",
  },
  {
    slug: "train",
    name: "Train",
    kicker: "Build real capability",
    description:
      "Connect learners to courses, internships, workshops, and Tamkeen-supported pathways that add practical momentum.",
    href: "/train",
    highlight: "Turn ambition into employable skills through structured exposure.",
  },
  {
    slug: "work",
    name: "Work",
    kicker: "Move into employment",
    description:
      "Help fresh graduates improve their CVs, discover openings, and book interviews with more confidence and visibility.",
    href: "/work",
    highlight: "Create a clearer route from readiness to opportunity.",
  },
];

export const phases = allPhases.filter((phase) => isPhaseEnabled(phase.slug));

const activePhaseCount = phases.length;
const studyOnlyRollout = !isPhaseEnabled("train") && !isPhaseEnabled("work");

export const homeStats: Stat[] = [
  {
    label: "Rollout mode",
    value: studyOnlyRollout ? "Study-first release" : `${activePhaseCount} active stages`,
  },
  { label: "Launch focus", value: "Bahrain-first MVP" },
  { label: "Experience goal", value: "Guided, credible, premium" },
  { label: "Founder model", value: "Founder-led by Kasir" },
];

export const homeHeroMetrics: HeroMetric[] = [
  { label: "Launch market", value: "Bahrain" },
  {
    label: "Rollout mode",
    value: studyOnlyRollout ? "Study-first launch" : "Multi-phase platform",
  },
  {
    label: "Current public phase",
    value: studyOnlyRollout ? "Study" : "Study, Train, and Work",
  },
];

const allJourneySteps: Array<JourneyStep & { slug: Phase["slug"] }> = [
  {
    slug: "study",
    phase: "01",
    title: "Choose with better information",
    description:
      "Students start with university discovery, major comparison, and market awareness before they commit.",
    detail:
      "This reduces guesswork at the point where academic choices shape career direction.",
  },
  {
    slug: "train",
    phase: "02",
    title: "Build readiness through real exposure",
    description:
      "Courses, internships, Tamkeen-supported programs, and workshops help turn ambition into usable skill.",
    detail:
      "The middle phase is designed to make graduates more capable before they begin applying.",
  },
  {
    slug: "work",
    phase: "03",
    title: "Move into work with more visibility",
    description:
      "Job listings, CV making, and interview-booking concepts create a more guided transition into employment.",
    detail:
      "The final phase keeps employability support visible instead of leaving graduates to self-navigate.",
  },
];

export const journeySteps: JourneyStep[] = allJourneySteps
  .filter((step) => isPhaseEnabled(step.slug))
  .map((step, index) => ({
    ...step,
    phase: `0${index + 1}`,
  }));

export const studyArchitecture: RouteHighlight[] = [
  {
    icon: "university",
    title: "Universities",
    description:
      "Browse Bahrain universities through a structure built for later GCC expansion.",
    href: "/study/universities",
    kicker: "University discovery",
    detail: "University -> College -> Major",
  },
  {
    icon: "compare",
    title: "University Comparison",
    description:
      "Compare two universities and majors side by side across fees, requirements, and study plans.",
    href: "/study/comparison",
    kicker: "Decision support",
    detail: "Side-by-side evaluation",
  },
  {
    icon: "market",
    title: "Bahrain Market Needs",
    description:
      "Use MVP demo insights to connect academic choices with demand awareness more carefully.",
    href: "/study/market-needs",
    kicker: "Market context",
    detail: "Placeholder visual insights",
  },
  {
    icon: "psychometric",
    title: "Take a Psychometric Test",
    description:
      "Help students explore which majors may suit their interests, strengths, and preferences.",
    href: "/study/psychometric-test",
    kicker: "Major match guidance",
    detail: "Interest and preference fit",
    ctaLabel: "Start Test",
  },
  {
    icon: "advisor",
    title: "Major Advising",
    description:
      "Book paid advising sessions with specialists who can turn uncertainty into a clearer next step.",
    href: "/study/major-advising",
    kicker: "Professional guidance",
    detail: "30, 40, or 60 minute sessions",
  },
];

const allTrainArchitecture: RouteHighlight[] = [
  {
    icon: "institutions",
    title: "Institutions and Internships",
    description:
      "A structured entry point into practical learning, supported programs, and workplace exposure.",
    href: "/train/institutions-internships",
    kicker: "Training architecture",
    detail: "Courses, programs, internships",
  },
  {
    icon: "courses",
    title: "Courses",
    description:
      "Language, software, school-support, and art courses with provider, fee, and duration details.",
    href: "/train/courses",
    kicker: "Practical skill-building",
    detail: "Category-based discovery",
  },
  {
    icon: "tamkeen",
    title: "Tamkeen Programs",
    description:
      "Clean listings for supported opportunities that improve access to practical readiness pathways.",
    href: "/train/tamkeen-programs",
    kicker: "Supported opportunities",
    detail: "Partnership-ready placeholder layer",
  },
  {
    icon: "internship",
    title: "Internships",
    description:
      "Role cards that help students and fresh graduates understand exposure, field, and expectations.",
    href: "/train/internships",
    kicker: "Real-world exposure",
    detail: "Field and employer context",
  },
  {
    icon: "workshop",
    title: "Workshops",
    description:
      "Bookable creative and skills-based workshops, plus a request flow for unmet learner demand.",
    href: "/train/workshops",
    kicker: "Flexible learning",
    detail: "Detail pages and request form",
  },
];

export const trainArchitecture = isPhaseEnabled("train") ? allTrainArchitecture : [];

const allWorkArchitecture: RouteHighlight[] = [
  {
    icon: "job",
    title: "Apply for a Job",
    description:
      "Graduate-friendly job listings with filters, requirements, and clearer next-step framing.",
    href: "/work/jobs",
    kicker: "Opportunity discovery",
    detail: "Application plus interview concept",
  },
  {
    icon: "cv",
    title: "CV Making",
    description:
      "Professional resume support with pricing tiers, expert profiles, and direct booking actions.",
    href: "/work/cv-making",
    kicker: "Career services",
    detail: "Premium service positioning",
  },
];

export const workArchitecture = isPhaseEnabled("work") ? allWorkArchitecture : [];

export const platformPrinciples: FeaturePreview[] = [
  {
    title: "Structured direction",
    description:
      "Each phase is organized to reduce decision fatigue and show clear next actions.",
  },
  {
    title: "Credible presentation",
    description:
      "The product is positioned like a serious startup platform, not an academic exercise.",
  },
  {
    title: "Service-ready flows",
    description:
      "Booking, inquiry, and application interfaces are ready for later backend connection.",
  },
];

const allFeaturePreviews: Array<PhaseTagged<FeaturePreview>> = [
  {
    phase: "study",
    title: "Universities",
    description:
      "Browse Bahrain universities, faculties, and majors in a structure built to grow across the GCC.",
  },
  {
    phase: "study",
    title: "University Comparison",
    description:
      "Compare two study paths side by side across fees, requirements, study plans, and student feedback.",
  },
  {
    phase: "study",
    title: "Market Insights",
    description:
      "See placeholder demand signals that help users choose majors with more awareness of market needs.",
  },
  {
    phase: "study",
    title: "Major Advising",
    description:
      "Book paid advising sessions with specialists who can translate options into next steps.",
  },
  {
    phase: "study",
    title: "Major Match Test",
    description:
      "Use RIASEC-style interests and preference signals to explore best-fit bachelor major directions.",
  },
  {
    phase: "train",
    title: "Courses",
    description:
      "Find practical courses across languages, software, school support, and creative skills.",
  },
  {
    phase: "train",
    title: "Internships",
    description:
      "Explore real-world opportunities that give fresh graduates experience before full-time roles.",
  },
  {
    phase: "train",
    title: "Workshops",
    description:
      "Join premium workshop experiences and request new workshop topics when supply does not yet exist.",
  },
  {
    phase: "work",
    title: "Jobs",
    description:
      "Access graduate-friendly job opportunities with a clearer application and interview flow.",
  },
  {
    phase: "work",
    title: "CV Making",
    description:
      "Book resume experts who can shape a stronger professional story for job applications.",
  },
];

export const featurePreviews: FeaturePreview[] = allFeaturePreviews
  .filter((feature) => !feature.phase || isPhaseEnabled(feature.phase))
  .map((feature) => ({ title: feature.title, description: feature.description }));

export const founder: Founder = {
  name: "Kasir",
  title: "Founder",
  bio: "Kasir leads Student Hub with a practical goal: give students and fresh graduates clearer decisions at every stage from choosing a major to entering the workforce.",
  focus: [
    "Education-to-employment strategy",
    "Bahrain-first rollout and partnerships",
    "User-centered advising and service design",
  ],
};

export const roadmap = [
  {
    phase: "Phase 01",
    title: "Launch the Bahrain MVP",
    description:
      "Build a trusted destination for study discovery, training access, and graduate opportunity guidance.",
  },
  {
    phase: "Phase 02",
    title: "Expand service depth",
    description:
      "Add richer data, live booking logic, stronger market insights, and deeper employer-facing workflows.",
  },
  {
    phase: "Phase 03",
    title: "Scale across the GCC",
    description:
      "Extend universities, institutions, and employability services regionally while preserving local relevance.",
  },
];

export const contactFaqs: FAQ[] = [
  {
    question: "Is Student Hub live today?",
    answer:
      "This website presents a polished MVP-style frontend. Some listings and insights use placeholder demo content until live partnerships and data feeds are connected.",
  },
  {
    question: "Who is Student Hub for?",
    answer:
      "The platform is designed for students, school graduates, fresh graduates, and anyone navigating the move from study into training and work.",
  },
  {
    question: "Does Student Hub only focus on Bahrain?",
    answer:
      "Student Hub starts with Bahrain to keep the guidance locally relevant, while the product structure is designed to expand into the GCC over time.",
  },
];