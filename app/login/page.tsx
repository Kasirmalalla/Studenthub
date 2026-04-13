import { LockKeyhole } from "lucide-react";

import { AccountPlaceholder } from "@/components/sections/account-placeholder";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Login",
  description: "Placeholder login route for the future Student Hub account area.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <AccountPlaceholder
      eyebrow="Account access"
      title="Login is prepared as a future launch extension."
      description="The account area is intentionally designed as part of the MVP structure so the platform can later support authentication, saved services, and tracked activity."
      aside={
        <div className="surface-card rounded-[32px] p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12 text-brand">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            Future login would support saved bookings, account settings, wallet details, and secure service history.
          </p>
        </div>
      }
      panels={[
        { title: "Secure authentication", copy: "Email login, social sign-in, and role-based onboarding can be added here later." },
        { title: "Return journey continuity", copy: "Users would be able to pick up where they left off across study, training, and work flows." },
      ]}
    />
  );
}
