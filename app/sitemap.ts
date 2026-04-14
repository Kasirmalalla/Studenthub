import type { MetadataRoute } from "next";

import { isPhaseEnabled } from "@/data/feature-flags";
import { universities } from "@/data/study";
import { courses, internships, workshops } from "@/data/train";
import { cvExperts, jobs } from "@/data/work";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl("/").replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/about",
    "/study",
    "/study/universities",
    "/study/comparison",
    "/study/market-needs",
    "/study/major-advising",
    ...(isPhaseEnabled("train")
      ? [
          "/train",
          "/train/institutions-internships",
          "/train/courses",
          "/train/tamkeen-programs",
          "/train/internships",
          "/train/workshops",
        ]
      : []),
    ...(isPhaseEnabled("work") ? ["/work", "/work/jobs", "/work/cv-making"] : []),
    "/book-online",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const universityRoutes = universities.flatMap((university) => [
    {
      url: `${baseUrl}/study/universities/${university.slug}`,
      lastModified: new Date(),
    },
    ...university.colleges.flatMap((college) => [
      {
        url: `${baseUrl}/study/universities/${university.slug}/${college.slug}`,
        lastModified: new Date(),
      },
      ...college.majors.map((major) => ({
        url: `${baseUrl}/study/universities/${university.slug}/${college.slug}/${major.slug}`,
        lastModified: new Date(),
      })),
    ]),
  ]);

  const courseRoutes = isPhaseEnabled("train")
    ? courses.map((course) => ({
        url: `${baseUrl}/train/courses/${course.slug}`,
        lastModified: new Date(),
      }))
    : [];

  const internshipRoutes = isPhaseEnabled("train")
    ? internships.map((internship) => ({
        url: `${baseUrl}/train/internships/${internship.slug}`,
        lastModified: new Date(),
      }))
    : [];

  const workshopRoutes = isPhaseEnabled("train")
    ? workshops.map((workshop) => ({
        url: `${baseUrl}/train/workshops/${workshop.slug}`,
        lastModified: new Date(),
      }))
    : [];

  const jobRoutes = isPhaseEnabled("work")
    ? jobs.map((job) => ({
        url: `${baseUrl}/work/jobs/${job.slug}`,
        lastModified: new Date(),
      }))
    : [];

  const cvRoutes = isPhaseEnabled("work")
    ? cvExperts.map((expert) => ({
        url: `${baseUrl}/work/cv-making/${expert.slug}`,
        lastModified: new Date(),
      }))
    : [];

  return [
    ...staticRoutes,
    ...universityRoutes,
    ...courseRoutes,
    ...internshipRoutes,
    ...workshopRoutes,
    ...jobRoutes,
    ...cvRoutes,
  ];
}