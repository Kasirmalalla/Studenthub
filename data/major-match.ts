export type RiasecCode =
  | "realistic"
  | "investigative"
  | "artistic"
  | "social"
  | "enterprising"
  | "conventional";

export type PreferenceCode =
  | "people"
  | "systems"
  | "practical"
  | "theoretical"
  | "structured"
  | "flexible"
  | "creative"
  | "analytical"
  | "leadership"
  | "support";

type ScoreKey = RiasecCode | PreferenceCode;
type WeightMap = Partial<Record<ScoreKey, number>>;

export type MajorMatchQuestion = {
  id: string;
  prompt: string;
  helper?: string;
  weights: WeightMap;
};

export type MajorMatchSection = {
  id: string;
  title: string;
  description: string;
  questionIds: string[];
};

export type MajorProfile = {
  slug: string;
  name: string;
  summary: string;
  riasec: Partial<Record<RiasecCode, number>>;
  preferences: Partial<Record<PreferenceCode, number>>;
  nextStep: string;
};

export type MajorMatchAnswers = Record<string, number>;

export type MajorRecommendation = {
  slug: string;
  name: string;
  score: number;
  explanation: string;
  matchingTraits: string[];
  suggestedNextStep: string;
};

export type MajorMatchResult = {
  completedAt: string;
  interestScores: Record<RiasecCode, number>;
  preferenceScores: Record<PreferenceCode, number>;
  topInterests: RiasecCode[];
  topPreferences: PreferenceCode[];
  confidenceLabel: string;
  confidenceDescription: string;
  recommendations: MajorRecommendation[];
};

export const responseScale = [
  { value: 1, label: "Not like me" },
  { value: 2, label: "Slightly" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Mostly" },
  { value: 5, label: "Very much" },
];

export const riasecDimensions: Record<
  RiasecCode,
  { label: string; description: string }
> = {
  realistic: {
    label: "Realistic",
    description: "Hands-on, practical, technical, physical, or tool-based work.",
  },
  investigative: {
    label: "Investigative",
    description: "Research, analysis, science, problem-solving, and deep inquiry.",
  },
  artistic: {
    label: "Artistic",
    description: "Creative expression, design, media, originality, and open-ended work.",
  },
  social: {
    label: "Social",
    description: "Helping, teaching, advising, healthcare, and people-centered support.",
  },
  enterprising: {
    label: "Enterprising",
    description: "Leadership, persuasion, entrepreneurship, influence, and business growth.",
  },
  conventional: {
    label: "Conventional",
    description: "Organization, accuracy, data, finance, systems, and structured workflows.",
  },
};

export const preferenceDimensions: Record<
  PreferenceCode,
  { label: string; description: string }
> = {
  people: {
    label: "People-facing",
    description: "Frequent communication, service, guidance, or collaboration.",
  },
  systems: {
    label: "Systems-focused",
    description: "Working with technical systems, data, processes, tools, or operations.",
  },
  practical: {
    label: "Practical",
    description: "Hands-on output, applied projects, and visible real-world results.",
  },
  theoretical: {
    label: "Theoretical",
    description: "Concepts, models, research, and abstract explanation.",
  },
  structured: {
    label: "Structured",
    description: "Clear rules, stable expectations, precision, and organized work.",
  },
  flexible: {
    label: "Flexible",
    description: "Open-ended projects, variety, exploration, and adaptable work.",
  },
  creative: {
    label: "Creative",
    description: "Original ideas, storytelling, visuals, design, or expressive work.",
  },
  analytical: {
    label: "Analytical",
    description: "Logic, evidence, data, evaluation, and complex problem-solving.",
  },
  leadership: {
    label: "Leadership",
    description: "Influencing direction, persuading others, and taking initiative.",
  },
  support: {
    label: "Support/service",
    description: "Helping people succeed, feel supported, or solve personal challenges.",
  },
};

export const majorMatchQuestions: MajorMatchQuestion[] = [
  {
    id: "build-fix",
    prompt: "I like working with tools, equipment, buildings, machines, or physical products.",
    weights: { realistic: 1, practical: 0.8, systems: 0.35 },
  },
  {
    id: "research-why",
    prompt: "I enjoy researching why something works and testing possible explanations.",
    weights: { investigative: 1, analytical: 0.75, theoretical: 0.45 },
  },
  {
    id: "create-express",
    prompt: "I enjoy creating visual, written, digital, or expressive work that communicates an idea.",
    weights: { artistic: 1, creative: 0.85, flexible: 0.35 },
  },
  {
    id: "help-people",
    prompt: "I like helping people learn, solve problems, or feel supported.",
    weights: { social: 1, people: 0.75, support: 0.7 },
  },
  {
    id: "lead-persuade",
    prompt: "I enjoy presenting ideas, leading projects, or persuading others.",
    weights: { enterprising: 1, leadership: 0.85, people: 0.35 },
  },
  {
    id: "organize-details",
    prompt: "I like organizing information, tracking details, and keeping work accurate.",
    weights: { conventional: 1, structured: 0.8, analytical: 0.35 },
  },
  {
    id: "improve-space-system",
    prompt: "I would enjoy designing or improving a physical space, product, or system.",
    weights: { realistic: 0.65, investigative: 0.35, artistic: 0.35, practical: 0.7, systems: 0.45 },
  },
  {
    id: "complex-problems",
    prompt: "I like solving complex science, health, math, or technology problems.",
    weights: { investigative: 1, analytical: 0.9, theoretical: 0.35 },
  },
  {
    id: "shape-experience",
    prompt: "I enjoy shaping how something looks, sounds, reads, or feels.",
    weights: { artistic: 1, creative: 0.9, flexible: 0.4 },
  },
  {
    id: "wellbeing-learning",
    prompt: "I feel motivated when my work directly improves someone's wellbeing or learning.",
    weights: { social: 1, support: 0.9, people: 0.75 },
  },
  {
    id: "launch-initiate",
    prompt: "I like influencing decisions, launching initiatives, or coordinating a team.",
    weights: { enterprising: 1, leadership: 0.9, flexible: 0.25 },
  },
  {
    id: "rules-data-budgets",
    prompt: "I prefer work where rules, data, budgets, or procedures matter.",
    weights: { conventional: 1, structured: 0.85, systems: 0.45, analytical: 0.35 },
  },
  {
    id: "hands-on-assignments",
    prompt: "I prefer hands-on assignments over purely abstract discussion.",
    weights: { realistic: 0.65, practical: 1 },
  },
  {
    id: "theory-models",
    prompt: "I enjoy theories, models, and deep conceptual explanations.",
    weights: { investigative: 0.75, theoretical: 1, analytical: 0.45 },
  },
  {
    id: "frequent-communication",
    prompt: "I want future work to involve frequent communication with people.",
    weights: { social: 0.55, enterprising: 0.45, people: 1 },
  },
  {
    id: "clear-instructions",
    prompt: "I prefer clear instructions, stable expectations, and organized schedules.",
    weights: { conventional: 0.65, structured: 1 },
  },
  {
    id: "open-ended-projects",
    prompt: "I like open-ended projects where I can create an original outcome.",
    weights: { artistic: 0.75, creative: 1, flexible: 0.75 },
  },
  {
    id: "responsibility-decisions",
    prompt: "I am comfortable taking responsibility for decisions and persuading a group.",
    weights: { enterprising: 0.8, leadership: 1 },
  },
];

export const majorMatchSections: MajorMatchSection[] = [
  {
    id: "interests",
    title: "What you naturally enjoy",
    description: "Rate the activities that sound energizing, even if you have not studied them deeply yet.",
    questionIds: [
      "build-fix",
      "research-why",
      "create-express",
      "help-people",
      "lead-persuade",
      "organize-details",
    ],
  },
  {
    id: "problems",
    title: "Problems you like solving",
    description: "These questions connect your interests to academic and career problem types.",
    questionIds: [
      "improve-space-system",
      "complex-problems",
      "shape-experience",
      "wellbeing-learning",
      "launch-initiate",
      "rules-data-budgets",
    ],
  },
  {
    id: "preferences",
    title: "Study and work preferences",
    description: "This layer helps separate similar majors by the kind of environment and tasks you may prefer.",
    questionIds: [
      "hands-on-assignments",
      "theory-models",
      "frequent-communication",
      "clear-instructions",
      "open-ended-projects",
      "responsibility-decisions",
    ],
  },
];

export const majorProfiles: MajorProfile[] = [
  {
    slug: "engineering",
    name: "Engineering",
    summary: "Applied problem-solving for systems, infrastructure, products, and technical design.",
    riasec: { realistic: 0.9, investigative: 0.75, conventional: 0.25 },
    preferences: { practical: 0.85, analytical: 0.75, systems: 0.65, structured: 0.35 },
    nextStep: "Explore engineering curricula, compare specializations, and speak with an advisor about math and science readiness.",
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    summary: "Software, computing systems, data, and logical problem-solving.",
    riasec: { investigative: 0.9, conventional: 0.45, realistic: 0.35 },
    preferences: { systems: 0.95, analytical: 0.9, theoretical: 0.45, flexible: 0.25 },
    nextStep: "Compare computer science plans with IT, data, and software-focused pathways.",
  },
  {
    slug: "business",
    name: "Business",
    summary: "Organizations, strategy, operations, entrepreneurship, and commercial decision-making.",
    riasec: { enterprising: 0.9, conventional: 0.55, social: 0.35 },
    preferences: { leadership: 0.85, people: 0.55, structured: 0.4, analytical: 0.35 },
    nextStep: "Explore business majors by function: marketing, management, entrepreneurship, operations, or analytics.",
  },
  {
    slug: "psychology",
    name: "Psychology",
    summary: "Human behavior, wellbeing, research, and support-focused pathways.",
    riasec: { social: 0.8, investigative: 0.65, artistic: 0.2 },
    preferences: { people: 0.85, support: 0.75, theoretical: 0.45, analytical: 0.45 },
    nextStep: "Review psychology curricula and compare it with sociology, education, and health sciences.",
  },
  {
    slug: "medicine-health-sciences",
    name: "Medicine / Health Sciences",
    summary: "Health, patient support, science, and evidence-based care pathways.",
    riasec: { investigative: 0.8, social: 0.75, realistic: 0.35, conventional: 0.25 },
    preferences: { people: 0.75, support: 0.85, analytical: 0.7, structured: 0.45 },
    nextStep: "Check entry requirements early and compare clinical, laboratory, and allied-health routes.",
  },
  {
    slug: "law",
    name: "Law",
    summary: "Argument, policy, structured reasoning, advocacy, and legal problem-solving.",
    riasec: { enterprising: 0.7, conventional: 0.65, investigative: 0.55 },
    preferences: { analytical: 0.75, leadership: 0.55, structured: 0.65, people: 0.35 },
    nextStep: "Explore legal study plans, reading load, debate activities, and pathways into public or private practice.",
  },
  {
    slug: "design",
    name: "Design",
    summary: "Visual communication, product experience, creative direction, and user-centered making.",
    riasec: { artistic: 0.95, realistic: 0.35, enterprising: 0.2 },
    preferences: { creative: 0.95, flexible: 0.75, practical: 0.35, people: 0.2 },
    nextStep: "Build a small portfolio and compare design, media, architecture, and creative technology paths.",
  },
  {
    slug: "education",
    name: "Education",
    summary: "Teaching, learning support, youth development, and structured people-centered guidance.",
    riasec: { social: 0.95, artistic: 0.3, conventional: 0.25 },
    preferences: { people: 0.9, support: 0.95, structured: 0.35, creative: 0.3 },
    nextStep: "Compare age groups, subject areas, and teaching practice requirements before choosing a track.",
  },
  {
    slug: "media-communications",
    name: "Media / Communications",
    summary: "Storytelling, public communication, content, campaigns, and audience engagement.",
    riasec: { artistic: 0.75, enterprising: 0.65, social: 0.35 },
    preferences: { creative: 0.8, people: 0.65, leadership: 0.45, flexible: 0.55 },
    nextStep: "Explore media portfolios, writing samples, public relations, journalism, and digital content pathways.",
  },
  {
    slug: "architecture",
    name: "Architecture",
    summary: "Built environments, design thinking, spatial problem-solving, and technical creativity.",
    riasec: { artistic: 0.7, realistic: 0.65, investigative: 0.35, conventional: 0.25 },
    preferences: { creative: 0.8, practical: 0.65, analytical: 0.45, systems: 0.3 },
    nextStep: "Review studio expectations, portfolio needs, and the balance between design and technical coursework.",
  },
  {
    slug: "accounting-finance",
    name: "Accounting / Finance",
    summary: "Financial systems, analysis, reporting, risk, and structured business decisions.",
    riasec: { conventional: 0.9, investigative: 0.45, enterprising: 0.35 },
    preferences: { structured: 0.9, analytical: 0.8, systems: 0.65, leadership: 0.25 },
    nextStep: "Compare accounting, finance, banking, analytics, and professional certification pathways.",
  },
  {
    slug: "biology",
    name: "Biology",
    summary: "Life sciences, laboratory thinking, health foundations, and environmental inquiry.",
    riasec: { investigative: 0.9, realistic: 0.35, social: 0.2 },
    preferences: { analytical: 0.8, theoretical: 0.65, practical: 0.4, structured: 0.25 },
    nextStep: "Compare biology with medicine, biotechnology, environmental science, and laboratory routes.",
  },
  {
    slug: "sociology",
    name: "Sociology",
    summary: "Society, communities, social patterns, policy questions, and research about people.",
    riasec: { social: 0.75, investigative: 0.65, artistic: 0.25 },
    preferences: { people: 0.75, support: 0.55, theoretical: 0.6, analytical: 0.45 },
    nextStep: "Compare sociology with psychology, education, law, policy, and social research pathways.",
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    summary: "Abstract reasoning, models, quantitative analysis, and rigorous problem-solving.",
    riasec: { investigative: 0.95, conventional: 0.45 },
    preferences: { analytical: 0.95, theoretical: 0.85, systems: 0.5, structured: 0.35 },
    nextStep: "Compare pure mathematics with statistics, data science, actuarial science, and engineering routes.",
  },
  {
    slug: "hospitality-tourism",
    name: "Hospitality / Tourism",
    summary: "Guest experience, service operations, events, travel, and people-facing business.",
    riasec: { social: 0.75, enterprising: 0.6, conventional: 0.25 },
    preferences: { people: 0.9, support: 0.55, leadership: 0.45, structured: 0.35, flexible: 0.35 },
    nextStep: "Explore hospitality, tourism, events, and service-management routes with practical experience options.",
  },
];

const riasecCodes = Object.keys(riasecDimensions) as RiasecCode[];
const preferenceCodes = Object.keys(preferenceDimensions) as PreferenceCode[];
const scoreKeys = [...riasecCodes, ...preferenceCodes] as ScoreKey[];

function createScoreRecord<T extends string>(keys: readonly T[]) {
  return keys.reduce(
    (scores, key) => ({ ...scores, [key]: 0 }),
    {} as Record<T, number>,
  );
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getTopCodes<T extends string>(scores: Record<T, number>, count: number): T[] {
  return Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => Number(scoreB) - Number(scoreA))
    .slice(0, count)
    .map(([code]) => code as T);
}

function getMaxByKey() {
  const maxScores = createScoreRecord(scoreKeys);

  for (const question of majorMatchQuestions) {
    for (const [key, weight] of Object.entries(question.weights) as Array<
      [ScoreKey, number]
    >) {
      maxScores[key] += weight * 4;
    }
  }

  return maxScores;
}

const maxByKey = getMaxByKey();

function getPercentScores<T extends ScoreKey>(scores: Record<ScoreKey, number>, keys: T[]) {
  return keys.reduce(
    (percentScores, key) => ({
      ...percentScores,
      [key]: maxByKey[key] ? clampScore((scores[key] / maxByKey[key]) * 100) : 0,
    }),
    {} as Record<T, number>,
  );
}

function getConfidenceLabel(topInterests: RiasecCode[], interestScores: Record<RiasecCode, number>) {
  const first = interestScores[topInterests[0]] ?? 0;
  const third = interestScores[topInterests[2]] ?? 0;
  const gap = first - third;

  if (first < 45) {
    return {
      label: "Exploratory result",
      description:
        "Your answers are still broad. Treat the recommendations as a starting point and compare several options.",
    };
  }

  if (gap >= 18) {
    return {
      label: "Focused pattern",
      description:
        "Your top interest areas are clearly ahead, so the first recommendations may be especially useful to explore.",
    };
  }

  return {
    label: "Balanced pattern",
    description:
      "Your interests are spread across more than one area. That can be valuable, especially for interdisciplinary majors.",
  };
}

function buildRecommendationExplanation(
  major: MajorProfile,
  topInterestLabels: string[],
  topPreferenceLabels: string[],
) {
  const interestText = topInterestLabels.length
    ? topInterestLabels.join(" and ")
    : "your strongest interest areas";
  const preferenceText = topPreferenceLabels.length
    ? topPreferenceLabels.join(" and ")
    : "your stated preferences";

  return `This is a supportive match because your answers leaned toward ${interestText}, with preferences around ${preferenceText}. ${major.summary}`;
}

export function calculateMajorMatch(answers: MajorMatchAnswers): MajorMatchResult {
  const rawScores = createScoreRecord(scoreKeys);

  for (const question of majorMatchQuestions) {
    const response = answers[question.id];

    if (!response) {
      continue;
    }

    const scaledResponse = Math.max(0, Math.min(4, response - 1));

    for (const [key, weight] of Object.entries(question.weights) as Array<
      [ScoreKey, number]
    >) {
      rawScores[key] += scaledResponse * weight;
    }
  }

  const interestScores = getPercentScores(rawScores, riasecCodes);
  const preferenceScores = getPercentScores(rawScores, preferenceCodes);
  const topInterests = getTopCodes(interestScores, 3);
  const topPreferences = getTopCodes(preferenceScores, 3);
  const confidence = getConfidenceLabel(topInterests, interestScores);

  const recommendations = majorProfiles
    .map((major) => {
      let score = 0;
      let maxScore = 0;

      for (const code of riasecCodes) {
        const weight = major.riasec[code] ?? 0;
        score += interestScores[code] * weight;
        maxScore += 100 * weight;
      }

      for (const code of preferenceCodes) {
        const weight = major.preferences[code] ?? 0;
        score += preferenceScores[code] * weight * 0.65;
        maxScore += 100 * weight * 0.65;
      }

      const alignedInterestCodes = riasecCodes
        .map((code) => ({ code, value: interestScores[code] * (major.riasec[code] ?? 0) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 2)
        .filter((item) => item.value > 0)
        .map((item) => item.code);

      const alignedPreferenceCodes = preferenceCodes
        .map((code) => ({ code, value: preferenceScores[code] * (major.preferences[code] ?? 0) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 2)
        .filter((item) => item.value > 0)
        .map((item) => item.code);

      const interestLabels = alignedInterestCodes.map((code) => riasecDimensions[code].label);
      const preferenceLabels = alignedPreferenceCodes.map(
        (code) => preferenceDimensions[code].label,
      );

      return {
        slug: major.slug,
        name: major.name,
        score: maxScore ? clampScore((score / maxScore) * 100) : 0,
        explanation: buildRecommendationExplanation(major, interestLabels, preferenceLabels),
        matchingTraits: [...interestLabels, ...preferenceLabels],
        suggestedNextStep: major.nextStep,
      } satisfies MajorRecommendation;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    completedAt: new Date().toISOString(),
    interestScores,
    preferenceScores,
    topInterests,
    topPreferences,
    confidenceLabel: confidence.label,
    confidenceDescription: confidence.description,
    recommendations,
  };
}