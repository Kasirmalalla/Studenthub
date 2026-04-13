import { JobBoard } from "@/components/forms/job-board";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Apply for a Job",
  description: "Browse job listings with filters and graduate-friendly detail pages.",
  path: "/work/jobs",
});

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work / Apply for a job"
        title="Graduate-friendly job listings with a clearer next-step experience."
        description="The jobs view includes simple filters so users can narrow opportunities before opening a detail page and moving toward application and interview booking."
      />
      <section className="section-wrap pt-0">
        <Container>
          <JobBoard />
        </Container>
      </section>
    </>
  );
}
