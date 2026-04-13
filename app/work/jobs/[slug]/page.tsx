import { notFound } from "next/navigation";

import { BookingModal } from "@/components/forms/booking-modal";
import { DemoForm } from "@/components/forms/demo-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getJobBySlug, jobs } from "@/data/work";
import { createBookingOption } from "@/lib/bookings";
import { buildMetadata, formatInlineList } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  return buildMetadata({
    title: job?.title ?? "Job",
    description: job?.description ?? "Job detail page",
    path: `/work/jobs/${slug}`,
  });
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Work / Job detail"
        title={job.title}
        description={`${job.description} Student Hub frames the application step clearly, then introduces a visible interview-booking concept instead of leaving users in the dark.`}
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="surface-card rounded-[28px] p-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Role overview
              </h2>
              <div className="mt-5 grid gap-4 text-sm text-ink-muted">
                <p>
                  <span className="font-semibold text-ink">Company:</span>{" "}
                  {job.company}
                </p>
                <p>
                  <span className="font-semibold text-ink">Location:</span>{" "}
                  {job.location}
                </p>
                <p>
                  <span className="font-semibold text-ink">Work mode:</span>{" "}
                  {job.workMode}
                </p>
                <p>
                  <span className="font-semibold text-ink">Languages:</span>{" "}
                  {formatInlineList(job.languages)}
                </p>
              </div>
            </div>
            <div className="surface-card rounded-[28px] p-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Requirements
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-muted">
                {job.requirements.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card rounded-[28px] p-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Interview visibility
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-muted">
                In the live product, applicants would be able to request an
                interview slot after application instead of waiting with no
                visibility into next steps.
              </p>
              <div className="mt-6">
                <BookingModal
                  serviceSlug={`${job.slug}-interview`}
                  title={`Interview request for ${job.title}`}
                  description="This placeholder flow shows how interview scheduling can become part of the candidate experience."
                  options={[
                    createBookingOption(job.slug, {
                      id: `${job.slug}-intro-call`,
                      duration: "20 mins",
                      price: "No charge",
                      label: "Intro call",
                    }),
                    createBookingOption(job.slug, {
                      id: `${job.slug}-first-interview`,
                      duration: "30 mins",
                      price: "No charge",
                      label: "First interview",
                    }),
                    createBookingOption(job.slug, {
                      id: `${job.slug}-hiring-manager`,
                      duration: "45 mins",
                      price: "No charge",
                      label: "Hiring manager slot",
                    }),
                  ]}
                  sourcePath={`/work/jobs/${job.slug}`}
                  triggerLabel="Book interview placeholder"
                />
              </div>
            </div>
          </div>
          <DemoForm
            formId="job-application"
            title="Apply now"
            description="This application form is frontend-only in the MVP, but it is structured to feel like a serious product flow."
            submitLabel="Submit application"
            successMessage="Your application has been recorded in this demo flow. In a live version, this would create a candidate record and unlock interview booking status."
            fields={[
              { name: "fullName", label: "Full name", placeholder: "Your name" },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "you@example.com",
              },
              {
                name: "phone",
                label: "Phone",
                type: "tel",
                placeholder: "+973 ...",
              },
              {
                name: "linkedin",
                label: "LinkedIn or portfolio",
                placeholder: "Optional link",
                required: false,
              },
              {
                name: "summary",
                label: "Short professional summary",
                type: "textarea",
                placeholder: "Why are you a fit for this role?",
              },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
