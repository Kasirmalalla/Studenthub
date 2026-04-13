import { notFound } from "next/navigation";

import { BookingModal } from "@/components/forms/booking-modal";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { cvExperts, getCvExpertBySlug } from "@/data/work";
import { createBookingOption } from "@/lib/bookings";
import { buildMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return cvExperts.map((expert) => ({ slug: expert.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const expert = getCvExpertBySlug(slug);

  return buildMetadata({
    title: expert?.name ?? "CV Expert",
    description: expert?.description ?? "CV expert detail page",
    path: `/work/cv-making/${slug}`,
  });
}

export default async function CvExpertDetailPage({ params }: Props) {
  const { slug } = await params;
  const expert = getCvExpertBySlug(slug);

  if (!expert) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Work / CV expert"
        title={expert.name}
        description={`${expert.description} This service is designed to feel premium, practical, and ready for direct booking.`}
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="surface-card rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Specialty
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-muted">
              {expert.specialty}
            </p>
          </div>
          <div className="surface-card rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Pricing tiers
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
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
            <div className="mt-6">
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
                sourcePath={`/work/cv-making/${expert.slug}`}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
