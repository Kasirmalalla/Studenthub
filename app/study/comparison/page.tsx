import { ComparisonTool } from "@/components/forms/comparison-tool";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "University Comparison",
  description: "Compare two universities and majors side by side.",
  path: "/study/comparison",
});

export default function ComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Study / University comparison"
        title="Compare two universities and majors side by side."
        description="This comparison view makes the MVP feel more product-like by letting users evaluate study paths across description, requirements, fees, academic plans, and review summaries."
      />
      <section className="section-wrap pt-0">
        <Container>
          <ComparisonTool />
        </Container>
      </section>
    </>
  );
}
