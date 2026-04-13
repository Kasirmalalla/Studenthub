import type { ReactNode } from "react";

import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type PlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  panels: Array<{ title: string; copy: string }>;
  aside?: ReactNode;
};

export function AccountPlaceholder({ eyebrow, title, description, panels, aside }: PlaceholderProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} aside={aside} />
      <section className="section-wrap pt-0">
        <Container className="grid gap-5 lg:grid-cols-2">
          {panels.map((panel, index) => (
            <Reveal key={panel.title} delay={index * 0.05}>
              <div className="surface-card rounded-[28px] p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{panel.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{panel.copy}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
