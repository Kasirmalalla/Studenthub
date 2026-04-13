import { BookOpenText } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { courses } from "@/data/train";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Courses",
  description: "Browse language, software, school, and art courses.",
  path: "/train/courses",
});

const groupedCourses = courses.reduce<Record<string, typeof courses>>((accumulator, course) => {
  accumulator[course.category] ??= [];
  accumulator[course.category].push(course);
  return accumulator;
}, {});

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Train / Courses"
        title="Practical courses that improve readiness before the job search."
        description="Course cards are organized by category so students can browse language, software, school support, and art tracks with provider details and pricing."
      />
      <section className="section-wrap pt-0">
        <Container className="space-y-12">
          {Object.entries(groupedCourses).map(([category, items]) => (
            <div key={category} className="space-y-5">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">{category}</h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((course, index) => (
                  <Reveal key={course.slug} delay={index * 0.03}>
                    <div className="surface-card rounded-[28px] p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                        <BookOpenText className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-ink-muted">
                        {course.provider} · {course.duration}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-ink-muted">{course.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full border border-border bg-surface-muted px-3 py-2 text-xs font-medium text-ink">
                          {course.location}
                        </span>
                        <span className="rounded-full border border-border bg-surface-muted px-3 py-2 text-xs font-medium text-ink">
                          {course.fees}
                        </span>
                      </div>
                      <div className="mt-6">
                        <ButtonLink href={`/train/courses/${course.slug}`} variant="dark">
                          View course
                        </ButtonLink>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
