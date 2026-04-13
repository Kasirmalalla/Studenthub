import { advisors, marketInsights, universities } from "@/data/study";
import { courses, internships, tamkeenPrograms, workshops } from "@/data/train";
import { cvExperts, jobs } from "@/data/work";

export function getStudySummary() {
  const colleges = universities.reduce((count, university) => count + university.colleges.length, 0);
  const majors = universities.reduce(
    (count, university) =>
      count + university.colleges.reduce((inner, college) => inner + college.majors.length, 0),
    0,
  );

  return {
    universities: universities.length,
    colleges,
    majors,
    advisors: advisors.length,
    marketInsights: marketInsights.length,
  };
}

export function getTrainSummary() {
  return {
    courses: courses.length,
    internships: internships.length,
    tamkeenPrograms: tamkeenPrograms.length,
    workshops: workshops.length,
  };
}

export function getWorkSummary() {
  return {
    jobs: jobs.length,
    cvExperts: cvExperts.length,
  };
}
