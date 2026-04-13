import { Compass, Home } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="section-wrap">
      <Container>
        <div className="surface-card mx-auto max-w-3xl rounded-[32px] p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Compass className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink">
            This page is not part of the current journey.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-ink-muted">
            The route may have changed while the platform is still in MVP mode. Head back to the
            Student Hub home page and continue from there.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/" variant="dark">
              <Home className="h-4 w-4" />
              Back Home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
