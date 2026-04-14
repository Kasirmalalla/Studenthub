import type { ReactNode } from "react";

import { PhaseUnavailable } from "@/components/sections/phase-unavailable";
import { isPhaseEnabled } from "@/data/feature-flags";

export default function WorkLayout({ children }: { children: ReactNode }) {
  if (!isPhaseEnabled("work")) {
    return <PhaseUnavailable phase="work" />;
  }

  return children;
}