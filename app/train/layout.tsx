import type { ReactNode } from "react";

import { PhaseUnavailable } from "@/components/sections/phase-unavailable";
import { isPhaseEnabled } from "@/data/feature-flags";

export default function TrainLayout({ children }: { children: ReactNode }) {
  if (!isPhaseEnabled("train")) {
    return <PhaseUnavailable phase="train" />;
  }

  return children;
}