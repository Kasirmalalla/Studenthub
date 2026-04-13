import type { CvExpert, Job } from "@/data/types";

export const jobs: Job[] = [
  {
    slug: "graduate-marketing-coordinator",
    title: "Graduate Marketing Coordinator",
    company: "Northstar Retail Group",
    location: "Manama",
    workMode: "Hybrid",
    description: "Support campaigns, reporting, supplier coordination, and branded content planning.",
    requirements: [
      "Degree in marketing, business, or communication",
      "Clear writing and presentation skills",
      "Comfort with reporting and collaboration tools",
    ],
    languages: ["English required", "Arabic preferred"],
  },
  {
    slug: "junior-data-analyst",
    title: "Junior Data Analyst",
    company: "Insight Harbor",
    location: "Seef",
    workMode: "On site",
    description: "Clean data, prepare dashboard-ready reports, and support operational decisions.",
    requirements: [
      "Degree in IT, information systems, or analytics",
      "Strong spreadsheet handling",
      "Ability to explain findings clearly",
    ],
    languages: ["English required"],
  },
  {
    slug: "graduate-hr-coordinator",
    title: "Graduate HR Coordinator",
    company: "PeopleLine Bahrain",
    location: "Riffa",
    workMode: "On site",
    description: "Coordinate candidates, onboarding flows, and employee documentation.",
    requirements: [
      "Degree in HR, business, or related field",
      "Strong organization and communication",
      "Professional handling of sensitive information",
    ],
    languages: ["English required", "Arabic preferred"],
  },
  {
    slug: "junior-architectural-assistant",
    title: "Junior Architectural Assistant",
    company: "Axis Design Office",
    location: "Bahrain Bay",
    workMode: "Hybrid",
    description: "Assist with drawings, site notes, and studio presentation visuals.",
    requirements: [
      "Degree in architecture or related design field",
      "Portfolio or project samples",
      "Comfort with design tools",
    ],
    languages: ["English required"],
  },
  {
    slug: "graduate-finance-associate",
    title: "Graduate Finance Associate",
    company: "Capital Crescent",
    location: "Bahrain Bay",
    workMode: "On site",
    description: "Support reporting, reconciliations, and structured financial analysis.",
    requirements: [
      "Degree in accounting, finance, or banking",
      "Strong numerical discipline",
      "Confidence with spreadsheets",
    ],
    languages: ["English required"],
  },
];

export const cvExperts: CvExpert[] = [
  {
    slug: "noor-alhaddad",
    name: "Noor AlHaddad",
    specialty: "Graduate CV positioning",
    description: "Shapes early-career CVs into clearer, more credible documents with stronger impact language.",
    pricing: [
      { label: "CV Review", price: "15 BHD" },
      { label: "CV Rewrite", price: "28 BHD" },
      { label: "CV + LinkedIn", price: "42 BHD" },
    ],
  },
  {
    slug: "omar-jalal",
    name: "Omar Jalal",
    specialty: "Business and finance profiles",
    description: "Supports graduates targeting structured roles in finance, banking, and operations.",
    pricing: [
      { label: "CV Review", price: "18 BHD" },
      { label: "CV Rewrite", price: "30 BHD" },
      { label: "CV + Interview Notes", price: "44 BHD" },
    ],
  },
  {
    slug: "huda-salem",
    name: "Huda Salem",
    specialty: "Creative and portfolio-led resumes",
    description: "Helps designers and media graduates connect their CV story to stronger portfolio positioning.",
    pricing: [
      { label: "CV Review", price: "17 BHD" },
      { label: "CV Rewrite", price: "32 BHD" },
      { label: "CV + Portfolio Bio", price: "46 BHD" },
    ],
  },
  {
    slug: "ahmed-farooq",
    name: "Ahmed Farooq",
    specialty: "Tech and product career documents",
    description: "Improves CV clarity for software, IT, and analytical roles with stronger project framing.",
    pricing: [
      { label: "CV Review", price: "18 BHD" },
      { label: "CV Rewrite", price: "34 BHD" },
      { label: "CV + Career Summary", price: "48 BHD" },
    ],
  },
];

export function getJobBySlug(slug: string) {
  return jobs.find((item) => item.slug === slug);
}

export function getCvExpertBySlug(slug: string) {
  return cvExperts.find((item) => item.slug === slug);
}
