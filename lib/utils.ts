import type { Metadata } from "next";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatInlineList(values: readonly string[], separator = " / ") {
  return values.filter(Boolean).join(separator);
}

export function groupBy<T>(items: readonly T[], getKey: (item: T) => string) {
  return items.reduce<Record<string, T[]>>((accumulator, item) => {
    const key = getKey(item);
    (accumulator[key] ??= []).push(item);
    return accumulator;
  }, {});
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatCurrency(value: string | number) {
  if (typeof value === "string") {
    return value;
  }

  return `${value.toFixed(0)} BHD`;
}

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = `${title} | Student Hub`;
  const url = `https://studenthub.bh${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Student Hub",
      locale: "en_BH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
