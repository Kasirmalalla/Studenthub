import Link from "next/link";
import { ArrowRight, CalendarDays, GraduationCap, MapPin, Sparkles } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import { isPhaseEnabled } from "@/data/feature-flags";
import { navItems } from "@/data/site";

const studyOnlyRollout = !isPhaseEnabled("train") && !isPhaseEnabled("work");

const liveNowLinks = [
  { label: "Browse universities", href: "/study/universities" },
  { label: "Compare majors", href: "/study/comparison" },
  { label: "Market needs", href: "/study/market-needs" },
  { label: "Book advising", href: "/study/major-advising" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-[#141414] py-14 text-white">
      <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.8fr_0.95fr]">
        <div className="space-y-5">
          <BrandMark className="[&_*]:text-white" />
          <p className="max-w-md text-sm leading-7 text-white/74">
            {studyOnlyRollout
              ? "Student Hub is publicly rolling out the Study phase first in Bahrain so students can compare universities, majors, and advising options before later phases reopen."
              : "Student Hub is a Bahrain-first platform connecting study choices, training opportunities, and work readiness into one clearer journey."}
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-white/80">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <MapPin className="h-4 w-4 text-brand" />
              Bahrain-based
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <GraduationCap className="h-4 w-4 text-brand" />
              Study phase live
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <CalendarDays className="h-4 w-4 text-brand" />
              Contact form active
            </span>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">Explore</p>
          <div className="space-y-3 text-sm text-white/78">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">Live now</p>
          <div className="space-y-3 text-sm text-white/78">
            {liveNowLinks.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between gap-3 transition hover:text-white">
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 text-brand" />
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/72">
            <p className="font-semibold text-white">Current rollout note</p>
            <p className="mt-2">
              Train and Work remain in development and can be brought back into the public experience later.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <Sparkles className="h-4 w-4" />
              Study-first release
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}