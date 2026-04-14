import type { MetadataRoute } from "next";

import { disabledPhaseSlugs } from "@/data/feature-flags";
import { getSiteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disabledPhaseSlugs.map((slug) => `/${slug}`),
    },
    sitemap: getSiteUrl("/sitemap.xml"),
  };
}