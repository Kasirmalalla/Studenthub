import type { MetadataRoute } from "next";

import { disabledPhaseSlugs } from "@/data/feature-flags";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disabledPhaseSlugs.map((slug) => `/${slug}`),
    },
    sitemap: "https://studenthub.bh/sitemap.xml",
  };
}