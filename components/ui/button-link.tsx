import type { ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "dark" | "ghost";
};

const variants = {
  primary:
    "border-brand-deep bg-brand text-ink shadow-[0_16px_36px_rgba(228,178,0,0.22)] hover:border-brand-deep hover:bg-brand-soft",
  dark:
    "border-[#111111] bg-[#111111] text-white shadow-[0_16px_36px_rgba(17,17,17,0.18)] hover:border-brand/40 hover:bg-ink-soft",
  ghost:
    "border-border bg-white text-ink shadow-[0_12px_28px_rgba(26,26,26,0.05)] hover:border-brand/30 hover:bg-brand/6",
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}