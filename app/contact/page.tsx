import { Mail, MapPin, MessageSquareText } from "lucide-react";

import { DemoForm } from "@/components/forms/demo-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { contactFaqs } from "@/data/site";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Student Hub for general inquiries, partnerships, or early access interest.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Student Hub"
        title="A polished entry point for questions, partnerships, and early interest."
        description="Use this contact page to reach Student Hub about advising, future partnerships, platform interest, or launch-related conversations."
      />

      <section className="section-wrap pt-0">
        <Container className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="surface-card rounded-[32px] p-6 sm:p-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Location</p>
                    <p className="text-sm text-ink-muted">Bahrain-based platform</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <p className="text-sm text-ink-muted">
                      hello@studenthub.demo
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                    <MessageSquareText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Social placeholders
                    </p>
                    <p className="text-sm text-ink-muted">
                      Instagram and LinkedIn placeholders are ready in the
                      footer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <DemoForm
              formId="contact"
              title="Send a message"
              description="This form is frontend-only for the MVP, but it is designed to feel trustworthy and complete."
              submitLabel="Send inquiry"
              successMessage="Your inquiry has been captured in this demo flow. In the live version, this would route into email or CRM handling."
              fields={[
                { name: "name", label: "Full name", placeholder: "Your name" },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "you@example.com",
                },
                {
                  name: "topic",
                  label: "Inquiry type",
                  type: "select",
                  options: [
                    "General inquiry",
                    "Partnership",
                    "Advising",
                    "Training",
                    "Work opportunities",
                  ],
                },
                {
                  name: "message",
                  label: "Message",
                  type: "textarea",
                  placeholder: "How can Student Hub help?",
                },
              ]}
            />
          </Reveal>
        </Container>
      </section>

      <section className="section-wrap">
        <Container className="space-y-5">
          {contactFaqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <div className="surface-card rounded-[28px] p-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {faq.question}
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink-muted">
                  {faq.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
