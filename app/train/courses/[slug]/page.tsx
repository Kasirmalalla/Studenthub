import { notFound } from "next/navigation";

import { BookingModal } from "@/components/forms/booking-modal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { courses, getCourseBySlug } from "@/data/train";
import { createBookingOption } from "@/lib/bookings";
import { buildMetadata } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return buildMetadata({
    title: course?.title ?? "Course",
    description: course?.summary ?? "Course detail page",
    path: `/train/courses/${slug}`,
  });
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Train / Course detail"
        title={course.title}
        description={`${course.summary} This page is structured to support future registration and institution partner details.`}
        actions={[{ href: "/train/courses", label: "Back to courses", variant: "ghost" }]}
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="surface-card rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Course details
            </h2>
            <div className="mt-5 grid gap-4 text-sm text-ink-muted">
              <p>
                <span className="font-semibold text-ink">Provider:</span>{" "}
                {course.provider}
              </p>
              <p>
                <span className="font-semibold text-ink">Duration:</span>{" "}
                {course.duration}
              </p>
              <p>
                <span className="font-semibold text-ink">Fees:</span>{" "}
                {course.fees}
              </p>
              <p>
                <span className="font-semibold text-ink">Format:</span>{" "}
                {course.format}
              </p>
              <p>
                <span className="font-semibold text-ink">Location:</span>{" "}
                {course.location}
              </p>
              <p>
                <span className="font-semibold text-ink">Contact:</span>{" "}
                {course.contact}
              </p>
            </div>
          </div>
          <div className="surface-card rounded-[28px] p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              What you gain
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-muted">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>- {outcome}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookingModal
                serviceSlug={course.slug}
                title={course.title}
                description={course.summary}
                options={[
                  createBookingOption(course.slug, {
                    duration: course.duration,
                    price: course.fees,
                    label: `${course.format} registration`,
                    note: course.provider,
                  }),
                ]}
                sourcePath={`/train/courses/${course.slug}`}
                triggerLabel="Register"
              />
              <ButtonLink href="/book-online" variant="ghost">
                View all services
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
