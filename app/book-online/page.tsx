import { CalendarDays } from "lucide-react";

import { BookingModal } from "@/components/forms/booking-modal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { bookingServices } from "@/data/bookings";
import { groupBookingServicesByCategory } from "@/lib/bookings";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Book Online",
  description:
    "View bookable services across advising, CV making, workshops, and selected courses.",
  path: "/book-online",
});

const groupedServices = groupBookingServicesByCategory(bookingServices);

export default function BookOnlinePage() {
  return (
    <>
      <PageHero
        eyebrow="Book Online"
        title="One place to discover Student Hub's bookable services."
        description="This page gathers advisory sessions, CV support, workshops, and selected courses into one booking-friendly experience."
        actions={[{ href: "/contact", label: "Need a custom request?", variant: "ghost" }]}
        aside={
          <div className="surface-card rounded-[32px] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
              Service view
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
              Premium but still accessible.
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-muted">
              Booking flows are demo-ready today and can later connect to
              payment, availability, and account history.
            </p>
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
                  title={category}
                  description="Mock pricing and service details are included to make the MVP feel genuinely bookable."
                />
                <div className="grid gap-4 lg:grid-cols-2">
                  {items.map((service, index) => (
                    <Reveal key={service.slug} delay={index * 0.04}>
                      <div className="surface-card rounded-[28px] p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
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
                            <p className="font-semibold text-ink">
                              Price summary
                            </p>
                            <p className="mt-1">{service.priceSummary}</p>
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
