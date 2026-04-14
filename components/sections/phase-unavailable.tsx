import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { temporarilyUnavailablePhases } from "@/data/feature-flags";
import type { Phase } from "@/data/types";

type PhaseUnavailableProps = {
  phase: Exclude<Phase["slug"], "study">;
};

export function PhaseUnavailable({ phase }: PhaseUnavailableProps) {
  const content = temporarilyUnavailablePhases[phase];

  return (
    <>
      <PageHero
        eyebrow={`${content.name} phase`}
        title={content.title}
        description={content.description}
        actions={[
          { href: "/study", label: "Explore Study", variant: "primary" },
          { href: "/book-online", label: "Book Advising", variant: "dark" },
          { href: "/contact", label: "Contact Student Hub", variant: "ghost" },
        ]}
      />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Current public focus
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
                Student Hub is currently focused on the Study phase.
              </h2>
              <p className="mt-4 text-sm leading-8 text-ink-muted">
                This temporary rollout keeps public attention on university discovery,
                major comparison, Bahrain market context, and major advising while the
                next phases are refined behind the scenes.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card rounded-[30px] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                What you can do now
              </p>
              <div className="mt-4 space-y-4 text-sm leading-8 text-ink-muted">
                <p>Explore live Study routes and compare academic options.</p>
                <p>Book major advising sessions that are already part of the active release.</p>
                <p>Use Contact if you want updates about when this phase returns.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/study" variant="primary">
                  Go to Study
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost">
                  Ask for updates
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}