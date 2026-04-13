import Link from "next/link";
import { Globe, Mail, MapPin, MessageCircleMore } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import { footerLinks, navItems } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-[#141414] py-14 text-white">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <BrandMark className="[&_*]:text-white" />
          <p className="max-w-md text-sm leading-7 text-white/70">
            Student Hub is a Bahrain-first platform connecting study choices, training opportunities,
            and work readiness into one clearer journey.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/75">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand" />
              Bahrain-based
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand" />
              hello@studenthub.demo
            </span>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">Explore</p>
          <div className="space-y-3 text-sm text-white/75">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">Account</p>
          <div className="space-y-3 text-sm text-white/75">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="block transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Globe className="h-4 w-4 text-brand" />
            </span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <MessageCircleMore className="h-4 w-4 text-brand" />
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
