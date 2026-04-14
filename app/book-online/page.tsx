import { CalendarDays, Compass, Sparkles } from "lucide-react";

import { BookingModal } from "@/components/forms/booking-modal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { bookingServices } from "@/data/bookings";
import { isPhaseEnabled } from "@/data/feature-flags";
import { groupBookingServicesByCategory } from "@/lib/bookings";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Book Online",
  description:
    "Book Student Hub's current live study services, with the public rollout focused on major advising in Bahrain.",
  path: "/book-online",
});

const groupedServices = groupBookingServicesByCategory(bookingServices);
const studyOnlyRollout = !isPhaseEnabled("train") && !isPhaseEnabled("work");
const liveServiceCount = bookingServices.length;
const liveOptionCount = bookingServices.reduce(
  (count, service) => count + service.options.length,
  0,
);

export default function BookOnlinePage() {
  return (
    <>
      <PageHero
        eyebrow={studyOnlyRollout ? "Current live services" : "Book Online"}
        title={
          studyOnlyRollout
            ? "Book the live Study services available right now."
            : "One place to discover Student Hub's bookable services."
        }
        description={
          studyOnlyRollout
            ? "Student Hub is keeping the public booking layer intentionally focused on major advising first. That means the current experience is easier to understand, more credible, and better aligned with the live Study release."
            : "This page gathers advisory sessions, CV support, workshops, and selected courses into one booking-friendly experience."
        }
        actions={[
          { href: "/study/major-advising", label: "Explore major advising", variant: "primary" },
          { href: "/contact", label: "Contact Student Hub", variant: "ghost" },
        ]}
        aside={
          <div className="surface-card rounded-[32px] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
              Service view
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
              A focused booking layer feels more trustworthy.
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-muted">
              Users can already browse live advising options, compare session lengths, and send a booking request without sorting through unfinished categories.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] border border-border bg-surface-muted px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Live services
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                  {liveServiceCount}
                </p>
                <p className="mt-1 text-sm text-ink-muted">bookable advisor profiles</p>
              </div>
              <div className="rounded-[24px] border border-border bg-surface-muted px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Session options
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                  {liveOptionCount}
                </p>
                <p className="mt-1 text-sm text-ink-muted">clear pricing tiers across advisors</p>
              </div>
            </div>
          </div>
        }
      />

      <section className="section-wrap pt-0">
        <Container className="space-y-12">
          {Object.entries(groupedServices).map(([category, items]) =>
            items.length ? (
              <div key={category} className="space-y-6">
                <SectionHeading
                  eyebrow="Bookable services"
                  title={
                    studyOnlyRollout
                      ? "Major advising is the live booking layer right now."
                      : category
                  }
                  description={
                    studyOnlyRollout
                      ? "This public booking experience is intentionally narrow for now, which makes it easier for users to understand what is live and what comes next."
                      : "Mock pricing and service details are included to make the MVP feel genuinely bookable."
                  }
                />
                <div className="grid gap-4 lg:grid-cols-2">
                  {items.map((service, index) => (
                    <Reveal key={service.slug} delay={index * 0.04}>
                      <div className="surface-card rounded-[28px] p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                              <Sparkles className="h-3.5 w-3.5" />
                              Study live service
                            </div>
                            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
                              {service.title}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-ink-muted">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                            <CalendarDays className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="mt-5 grid gap-3 text-sm text-ink-muted sm:grid-cols-2">
                          <div className="rounded-[22px] border border-border bg-surface-muted px-4 py-3">
                            <p className="font-semibold text-ink">Duration</p>
                            <p className="mt-1">{service.durationSummary}</p>
                          </div>
                          <div className="rounded-[22px] border border-border bg-surface-muted px-4 py-3">
                            <p className="font-semibold text-ink">Price summary</p>
                            <p className="mt-1">{service.priceSummary}</p>
                          </div>
                        </div>
                        <div className="mt-5 rounded-[24px] border border-border bg-white px-4 py-4 text-sm leading-7 text-ink-muted">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                              <Compass className="h-4 w-4" />
                            </div>
                            <p>
                              Each advisor keeps multiple session lengths visible so users can choose lighter guidance or a deeper session without guessing the next step.
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <BookingModal
                            serviceSlug={service.slug}
                            title={service.title}
                            description={service.description}
                            options={service.options}
                            sourcePath="/book-online"
                          />
                          <ButtonLink href={service.href} variant="ghost">
                            View details
                          </ButtonLink>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </Container>
      </section>
    </>
  );
}