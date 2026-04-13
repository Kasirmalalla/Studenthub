import { BookOpenText, BriefcaseBusiness, Rocket } from "lucide-react";

import { InfoCard } from "@/components/ui/info-card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Institutions and Internships",
  description: "Explore courses, Tamkeen-supported programs, and internships.",
  path: "/train/institutions-internships",
});

export default function InstitutionsAndInternshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Train / Institutions and internships"
        title="A cleaner entry point into capability-building opportunities."
        description="This branch groups practical training options into three areas: courses, Tamkeen-supported programs, and internships."
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 md:grid-cols-3">
          <InfoCard icon={BookOpenText} title="Courses" description="Browse practical learning options across languages, software, school support, and art." href="/train/courses" />
          <InfoCard icon={Rocket} title="Tamkeen Programs" description="Review supported pathways with overview copy and clear apply actions." href="/train/tamkeen-programs" />
          <InfoCard icon={BriefcaseBusiness} title="Internships" description="Find work-exposure opportunities for students and fresh graduates." href="/train/internships" />
        </Container>
      </section>
    </>
  );
}
