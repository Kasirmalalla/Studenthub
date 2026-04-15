import type { LucideIcon } from "lucide-react";

import {
  ArrowLeftRight,
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CalendarSearch,
  ClipboardCheck,
  ClipboardList,
  Compass,
  FileText,
  GraduationCap,
  Landmark,
  Lightbulb,
  Rocket,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  university: Building2,
  compare: ArrowLeftRight,
  market: BarChart3,
  advisor: UsersRound,
  institutions: Landmark,
  courses: BookOpenText,
  tamkeen: Sparkles,
  internship: ClipboardList,
  workshop: Wrench,
  job: BriefcaseBusiness,
  cv: FileText,
  phase: GraduationCap,
  direction: Compass,
  growth: Rocket,
  clarity: Lightbulb,
  booking: CalendarSearch,
  psychometric: ClipboardCheck,
};

type IconTokenProps = {
  name: string;
  className?: string;
};

export function IconToken({ name, className }: IconTokenProps) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={cn(className)} />;
}
