import { BookingModal } from "@/components/forms/booking-modal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { cvExperts } from "@/data/work";
import { createBookingOption } from "@/lib/bookings";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "CV Making",
  description: "Browse resume experts and book professional CV support.",
  path: "/work/cv-making",
});

export default function CvMakingPage() {
  return (
    <>
      <PageHero
        eyebrow="Work / CV making"
        title="Professional CV support positioned as a real service."
        description="The CV making flow introduces polished profile cards, pricing tiers, and booking-ready calls to action so the service feels credible and useful."
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-2">
          {cvExperts.map((expert, index) => (
            <Reveal key={expert.slug} delay={index * 0.05}>
              <div className="surface-card rounded-[30px] p-6 sm:p-8">
                <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                  {expert.name}
                </h2>
                <p className="mt-2 text-sm font-medium text-ink-muted">
                  {expert.specialty}
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-muted">
                  {expert.description}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {expert.pricing.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[22px] border border-border bg-surface-muted px-4 py-4 text-sm"
                    >
                      <p className="font-semibold text-ink">{item.label}</p>
                      <p className="mt-2 text-ink-muted">{item.price}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <BookingModal
                    serviceSlug={expert.slug}
                    title={`Book ${expert.name}`}
                    description={expert.description}
                    options={expert.pricing.map((item) =>
                      createBookingOption(expert.slug, {
                        duration: item.label,
                        price: item.price,
                        label: item.label,
                      }),
                    )}
                    sourcePath="/work/cv-making"
                  />
                  <ButtonLink href={`/work/cv-making/${expert.slug}`} variant="ghost">
                    View profile
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
