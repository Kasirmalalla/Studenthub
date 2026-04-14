import type { Phase } from "@/data/types";

export type PhaseSlug = Phase["slug"];

export const phaseFlags: Record<PhaseSlug, boolean> = {
  study: true,
  train: false,
  work: false,
};

export function isPhaseEnabled(slug: PhaseSlug) {
  return phaseFlags[slug];
}

export const enabledPhaseSlugs = (Object.keys(phaseFlags) as PhaseSlug[]).filter(
  (slug) => phaseFlags[slug],
);

export const disabledPhaseSlugs = (Object.keys(phaseFlags) as PhaseSlug[]).filter(
  (slug) => !phaseFlags[slug],
);

export const temporarilyUnavailablePhases: Record<
  Exclude<PhaseSlug, "study">,
  {
    name: string;
    title: string;
    description: string;
  }
> = {
  train: {
    name: "Train",
    title: "The Train phase is temporarily unavailable.",
    description:
      "Student Hub is focusing on making the Study phase stronger first. The Train experience remains in the product roadmap and can be re-enabled once it is ready.",
  },
  work: {
    name: "Work",
    title: "The Work phase is temporarily unavailable.",
    description:
      "Student Hub is currently prioritizing the Study phase. The Work experience stays in the codebase and can be re-enabled when the rollout expands again.",
  },
};