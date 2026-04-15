export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type Stat = {
  label: string;
  value: string;
};

export type Phase = {
  slug: "study" | "train" | "work";
  name: string;
  kicker: string;
  description: string;
  href: string;
  highlight: string;
};

export type FeaturePreview = {
  title: string;
  description: string;
};

export type HeroMetric = {
  label: string;
  value: string;
};

export type RouteHighlight = {
  icon: string;
  title: string;
  description: string;
  href: string;
  kicker?: string;
  detail?: string;
  ctaLabel?: string;
};

export type JourneyStep = {
  phase: string;
  title: string;
  description: string;
  detail: string;
};

export type Founder = {
  name: string;
  title: string;
  bio: string;
  focus: string[];
};

export type Major = {
  slug: string;
  name: string;
  degree: string;
  duration: string;
  fees: string;
  description: string;
  requirements: string[];
  academicPlan: string[];
  review: string;
  jobOpportunities: string[];
  careerOutlook: string;
};

export type College = {
  slug: string;
  name: string;
  overview: string;
  majors: Major[];
};

export type University = {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  type: string;
  overview: string;
  tagline: string;
  tuitionBand: string;
  stats: Stat[];
  colleges: College[];
};

export type MarketInsight = {
  field: string;
  score: number;
  note: string;
};

export type Advisor = {
  slug: string;
  name: string;
  title: string;
  shortBio: string;
  specialization: string[];
  pricing: Array<{ duration: string; price: string }>;
};

export type Course = {
  slug: string;
  title: string;
  category: string;
  provider: string;
  format: string;
  duration: string;
  fees: string;
  location: string;
  summary: string;
  outcomes: string[];
  contact: string;
};

export type TamkeenProgram = {
  slug: string;
  title: string;
  provider: string;
  support: string;
  format: string;
  summary: string;
};

export type Internship = {
  slug: string;
  title: string;
  field: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  expectations: string[];
};

export type Workshop = {
  slug: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  fee: string;
  availability: string;
  format: string;
  description: string;
  outcomes: string[];
};

export type Job = {
  slug: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  description: string;
  requirements: string[];
  languages: string[];
};

export type CvExpert = {
  slug: string;
  name: string;
  specialty: string;
  description: string;
  pricing: Array<{ label: string; price: string }>;
};

export type BookingOption = {
  id: string;
  label: string;
  duration: string;
  price: string;
  note?: string;
};

export type BookingService = {
  slug: string;
  title: string;
  description: string;
  durationSummary: string;
  priceSummary: string;
  href: string;
  category: string;
  options: BookingOption[];
};

export type FAQ = {
  question: string;
  answer: string;
};
