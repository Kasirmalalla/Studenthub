import { UserRound } from "lucide-react";

import { AccountPlaceholder } from "@/components/sections/account-placeholder";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "My Account",
  description: "Placeholder account dashboard for future Student Hub scale.",
  path: "/my-account",
});

export default function MyAccountPage() {
  return (
    <AccountPlaceholder
      eyebrow="My account"
      title="A future account dashboard can keep the full Student Hub journey connected."
      description="This route is designed as a polished placeholder for saved interests, profile data, and personalized service history."
      aside={
        <div className="surface-card rounded-[32px] p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12 text-brand">
            <UserRound className="h-7 w-7" />
          </div>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            Future dashboard modules could include study interests, saved listings, booking history, and profile settings.
          </p>
        </div>
      }
      panels={[
        { title: "Profile overview", copy: "A clean summary of education stage, saved universities, and service preferences." },
        { title: "Recommendations", copy: "Suggested courses, internships, and jobs based on where the user is in the journey." },
      ]}
    />
  );
}
