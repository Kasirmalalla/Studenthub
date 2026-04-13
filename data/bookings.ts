import { advisors } from "@/data/study";
import { courses, workshops } from "@/data/train";
import { cvExperts } from "@/data/work";
import type { BookingService } from "@/data/types";
import { createBookingOption, createBookingService } from "@/lib/bookings";

export const bookingServices: BookingService[] = [
  ...advisors.map((advisor) =>
    createBookingService(
      {
        slug: advisor.slug,
        title: `${advisor.title} with ${advisor.name}`,
        description: advisor.shortBio,
        href: "/study/major-advising",
        category: "Major Advising",
      },
      advisor.pricing.map((item) =>
        createBookingOption(advisor.slug, {
          duration: item.duration,
          price: item.price,
          label: `${item.duration} advising session`,
        }),
      ),
    ),
  ),
  ...cvExperts.map((expert) =>
    createBookingService(
      {
        slug: expert.slug,
        title: `${expert.name} - ${expert.specialty}`,
        description: expert.description,
        href: "/work/cv-making",
        category: "CV Making",
      },
      expert.pricing.map((item) =>
        createBookingOption(expert.slug, {
          duration: item.label,
          price: item.price,
          label: item.label,
        }),
      ),
    ),
  ),
  ...workshops.map((workshop) =>
    createBookingService(
      {
        slug: workshop.slug,
        title: workshop.title,
        description: workshop.description,
        href: `/train/workshops/${workshop.slug}`,
        category: "Workshops",
      },
      [
        createBookingOption(workshop.slug, {
          duration: workshop.duration,
          price: workshop.fee,
          label: `${workshop.duration} workshop seat`,
          note: workshop.availability,
        }),
      ],
    ),
  ),
  ...courses.slice(0, 4).map((course) =>
    createBookingService(
      {
        slug: course.slug,
        title: course.title,
        description: course.summary,
        href: `/train/courses/${course.slug}`,
        category: "Selected Courses",
      },
      [
        createBookingOption(course.slug, {
          duration: course.duration,
          price: course.fees,
          label: `${course.format} registration`,
          note: course.provider,
        }),
      ],
    ),
  ),
];
