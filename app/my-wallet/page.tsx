import { Wallet } from "lucide-react";

import { AccountPlaceholder } from "@/components/sections/account-placeholder";
import { buildMetadata } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "My Wallet",
  description: "Placeholder wallet page for future Student Hub billing and payment methods.",
  path: "/my-wallet",
});

export default function MyWalletPage() {
  return (
    <AccountPlaceholder
      eyebrow="My wallet"
      title="Saved payment methods and billing summaries can scale into this route later."
      description="This polished placeholder keeps the future account experience coherent and ready for checkout-related expansion."
      aside={
        <div className="surface-card rounded-[32px] p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12 text-brand">
            <Wallet className="h-7 w-7" />
          </div>
          <p className="mt-5 text-sm leading-7 text-ink-muted">
            Future capabilities can include saved cards, billing history, payment status, and downloadable receipts.
          </p>
        </div>
      }
      panels={[
        { title: "Payment methods", copy: "A future area for secure saved cards, default payment methods, and billing preferences." },
        { title: "Billing summary", copy: "A clean record of booked services, charges, and any future subscription or package activity." },
      ]}
    />
  );
}
