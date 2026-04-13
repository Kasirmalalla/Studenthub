import { BookingModal } from "@/components/forms/booking-modal";
import { DemoForm } from "@/components/forms/demo-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { workshops } from "@/data/train";
import { createBookingOption } from "@/lib/bookings";
import { buildMetadata, formatInlineList } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Workshops",
  description:
    "Browse workshops and submit a workshop request if the right topic is missing.",
  path: "/train/workshops",
});

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        eyebrow="Train / Workshops"
        title="Workshop experiences that feel intentional, polished, and genuinely bookable."
        description="Workshop cards include instructor, duration, fee, and availability. The page also includes a request form for topics users want but cannot find yet."
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {workshops.map((workshop, index) => (
              <Reveal key={workshop.slug} delay={index * 0.05}>
                <div className="surface-card rounded-[28px] p-6">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {workshop.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-ink-muted">
                    {formatInlineList([workshop.instructor, workshop.duration])}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">
                    {workshop.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-border bg-surface-muted px-3 py-2 text-xs font-medium text-ink">
                      {workshop.fee}
                    </span>
                    <span className="rounded-full border border-border bg-surface-muted px-3 py-2 text-xs font-medium text-ink">
                      {workshop.availability}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
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
                      sourcePath="/train/workshops"
                      triggerLabel="Register"
                    />
                    <ButtonLink href={`/train/workshops/${workshop.slug}`} variant="ghost">
                      View details
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.08}>
            <DemoForm
              formId="workshop-request"
              title="Create a workshop request"
              description="If students cannot find the right workshop, Student Hub can capture demand for future topics."
              submitLabel="Submit request"
              successMessage="Your workshop request has been captured in this demo flow. In a live product this could feed planning, waitlists, or partner outreach."
              fields={[
                {
                  name: "topic",
                  label: "Workshop topic",
                  placeholder: "Example: UX portfolio reviews",
                },
                {
                  name: "category",
                  label: "Category",
                  type: "select",
                  options: [
                    "Design",
                    "Technology",
                    "Languages",
                    "Art",
                    "Career readiness",
                  ],
                },
                {
                  name: "format",
                  label: "Preferred format",
                  type: "select",
                  options: [
                    "In person",
                    "Online",
                    "Weekend intensive",
                    "Evening cohort",
                  ],
                },
                {
                  name: "notes",
                  label: "Notes",
                  type: "textarea",
                  placeholder:
                    "Anything else you'd like Student Hub to know?",
                },
              ]}
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
