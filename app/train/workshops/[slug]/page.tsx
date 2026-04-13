import { notFound } from "next/navigation";

import { BookingModal } from "@/components/forms/booking-modal";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getWorkshopBySlug, workshops } from "@/data/train";
import { createBookingOption } from "@/lib/bookings";
import { buildMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return workshops.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  return buildMetadata({
    title: workshop?.title ?? "Workshop",
    description: workshop?.description ?? "Workshop detail page",
    path: `/train/workshops/${slug}`,
  });
}

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);

  if (!workshop) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Train / Workshop detail"
        title={workshop.title}
        description={`${workshop.description} The detail page is designed to support future capacity management and direct registration.`}
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="surface-card rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Workshop information
            </h2>
            <div className="mt-5 grid gap-4 text-sm text-ink-muted">
              <p>
                <span className="font-semibold text-ink">Instructor:</span>{" "}
                {workshop.instructor}
              </p>
              <p>
                <span className="font-semibold text-ink">Duration:</span>{" "}
                {workshop.duration}
              </p>
              <p>
                <span className="font-semibold text-ink">Fee:</span>{" "}
                {workshop.fee}
              </p>
              <p>
                <span className="font-semibold text-ink">Format:</span>{" "}
                {workshop.format}
              </p>
              <p>
                <span className="font-semibold text-ink">Availability:</span>{" "}
                {workshop.availability}
              </p>
            </div>
          </div>
          <div className="surface-card rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              What participants gain
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-muted">
              {workshop.outcomes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="mt-6">
              <BookingModal
                serviceSlug={workshop.slug}
                title={workshop.title}
                description={workshop.description}
                options={[
                  createBookingOption(workshop.slug, {
                    duration: workshop.duration,
                    price: workshop.fee,
                    label: `${workshop.duration} workshop seat`,
                    note: workshop.availability,
                  }),
                ]}
                sourcePath={`/train/workshops/${workshop.slug}`}
                triggerLabel="Register"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
