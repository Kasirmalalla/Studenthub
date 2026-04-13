import type { MetadataRoute } from "next";

import { universities } from "@/data/study";
import { courses, internships, workshops } from "@/data/train";
import { cvExperts, jobs } from "@/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://studenthub.bh";

  const staticRoutes = [
    "",
    "/about",
    "/study",
    "/study/universities",
    "/study/comparison",
    "/study/market-needs",
    "/study/major-advising",
    "/train",
    "/train/institutions-internships",
    "/train/courses",
    "/train/tamkeen-programs",
    "/train/internships",
    "/train/workshops",
    "/work",
    "/work/jobs",
    "/work/cv-making",
    "/book-online",
    "/contact",
    "/login",
    "/sign-up",
    "/my-account",
    "/my-bookings",
    "/my-wallet",
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

  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/train/courses/${course.slug}`,
    lastModified: new Date(),
  }));

  const internshipRoutes = internships.map((internship) => ({
    url: `${baseUrl}/train/internships/${internship.slug}`,
    lastModified: new Date(),
  }));

  const workshopRoutes = workshops.map((workshop) => ({
    url: `${baseUrl}/train/workshops/${workshop.slug}`,
    lastModified: new Date(),
  }));

  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/work/jobs/${job.slug}`,
    lastModified: new Date(),
  }));

  const cvRoutes = cvExperts.map((expert) => ({
    url: `${baseUrl}/work/cv-making/${expert.slug}`,
    lastModified: new Date(),
  }));

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
