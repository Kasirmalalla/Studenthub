import { Clock3, WalletCards } from "lucide-react";

import { BookingModal } from "@/components/forms/booking-modal";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { advisors } from "@/data/study";
import { createBookingOption } from "@/lib/bookings";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Major Advising",
  description:
    "Book advising sessions with specialists who help students choose the right academic path.",
  path: "/study/major-advising",
});

export default function MajorAdvisingPage() {
  return (
    <>
      <PageHero
        eyebrow="Study / Major advising"
        title="Professional major advising that feels genuinely bookable."
        description="Student Hub positions advising as a serious service, not an afterthought. Users can review advisor focus areas, pricing, and session durations before booking."
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-2">
          {advisors.map((advisor, index) => (
            <Reveal key={advisor.slug} delay={index * 0.05}>
              <div className="surface-card rounded-[30px] p-6 sm:p-8">
                <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                  {advisor.name}
                </h2>
                <p className="mt-2 text-sm font-medium text-ink-muted">
                  {advisor.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-muted">
                  {advisor.shortBio}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {advisor.specialization.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {advisor.pricing.map((item) => (
                    <div
                      key={item.duration}
                      className="rounded-[22px] border border-border bg-white px-4 py-4 text-sm"
                    >
                      <div className="inline-flex items-center gap-2 text-ink">
                        <Clock3 className="h-4 w-4 text-brand" />
                        {item.duration}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 text-ink-muted">
                        <WalletCards className="h-4 w-4 text-brand" />
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <BookingModal
                    serviceSlug={advisor.slug}
                    title={`Book with ${advisor.name}`}
                    description={advisor.shortBio}
                    options={advisor.pricing.map((item) =>
                      createBookingOption(advisor.slug, {
                        duration: item.duration,
                        price: item.price,
                        label: `${item.duration} advising session`,
                      }),
                    )}
                    sourcePath="/study/major-advising"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
