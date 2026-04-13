import { CalendarCheck2 } from "lucide-react";

import { AccountPlaceholder } from "@/components/sections/account-placeholder";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "My Bookings",
  description: "Placeholder bookings page for future Student Hub service tracking.",
  path: "/my-bookings",
});

export default function MyBookingsPage() {
  return (
    <AccountPlaceholder
      eyebrow="My bookings"
      title="Upcoming services and booking history can live here later."
      description="The route is ready for a future account-linked experience where users can manage advising sessions, workshops, CV services, and more."
      aside={
        <div className="surface-card rounded-[32px] p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12 text-brand">
            <CalendarCheck2 className="h-7 w-7" />
          </div>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            Future states can include upcoming bookings, past activity, reschedule controls, and invoices.
          </p>
        </div>
      }
      panels={[
        { title: "Upcoming bookings", copy: "A future list of confirmed sessions with time, provider, and booking status." },
        { title: "Booking history", copy: "Archived services such as advising sessions, CV reviews, workshops, and course bookings." },
      ]}
    />
  );
}
