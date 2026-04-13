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
    "bg-brand text-ink hover:bg-brand-soft border-brand shadow-[0_16px_36px_rgba(228,178,0,0.2)]",
  dark: "border-ink bg-ink text-white hover:bg-ink-soft shadow-[0_16px_36px_rgba(26,26,26,0.12)]",
  ghost: "border-border bg-white/70 text-ink hover:bg-white",
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
        "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
