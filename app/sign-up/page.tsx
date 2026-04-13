import { UserRoundPlus } from "lucide-react";

import { AccountPlaceholder } from "@/components/sections/account-placeholder";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Sign Up",
  description: "Placeholder sign-up route for the future Student Hub account area.",
  path: "/sign-up",
});

export default function SignUpPage() {
  return (
    <AccountPlaceholder
      eyebrow="Create account"
      title="Sign-up can later activate a more personalized Student Hub experience."
      description="This placeholder route is designed to feel deliberate so the future account area can scale cleanly without looking like an afterthought."
      aside={
        <div className="surface-card rounded-[32px] p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12 text-brand">
            <UserRoundPlus className="h-7 w-7" />
          </div>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            Future registration could collect academic interests, training goals, and career stage to personalize recommendations.
          </p>
        </div>
      }
      panels={[
        { title: "Personal profile setup", copy: "Users could save universities, majors, jobs, and services relevant to their stage." },
        { title: "Smarter recommendations", copy: "A profile would allow Student Hub to suggest better courses, advisors, and work opportunities." },
      ]}
    />
  );
}
