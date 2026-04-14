import type { ReactNode } from "react";

import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isPhaseEnabled } from "@/data/feature-flags";
import { getSiteUrl } from "@/lib/utils";

import "./globals.css";

const studyOnlyRollout = !isPhaseEnabled("train") && !isPhaseEnabled("work");

export const metadata: Metadata = {
  title: "Student Hub",
  description: studyOnlyRollout
    ? "Student Hub is currently launching with Study first, helping students compare universities, majors, and advising options with more clarity in Bahrain."
    : "Student Hub helps students and fresh graduates move from study choices to training opportunities and into work with more clarity.",
  metadataBase: new URL(getSiteUrl("/")),
};

export const viewport: Viewport = {
  themeColor: "#e4b200",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="site-shell">
        <div className="border-b border-black/5 bg-ink px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white sm:py-3 sm:text-sm sm:tracking-[0.22em]">
          <span className="sm:hidden">Bahrain-first study guidance</span>
          <span className="hidden sm:inline">
            {studyOnlyRollout
              ? "Bahrain-first guidance for choosing universities, majors, and next study steps"
              : "Bahrain-first guidance for study, training, and work transitions"}
          </span>
        </div>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}