"use client";

import { useDeferredValue, useState } from "react";

import { ArrowLeftRight } from "lucide-react";

import { allMajors, universities } from "@/data/study";
import { formatInlineList } from "@/lib/utils";

function getMajorOptions(universitySlug: string) {
  const university = universities.find((item) => item.slug === universitySlug);

  return (
    university?.colleges.flatMap((college) =>
      college.majors.map((major) => ({
        slug: major.slug,
        label: `${major.name} / ${college.name}`,
      })),
    ) ?? []
  );
}

function getComparisonEntry(universitySlug: string, majorSlug: string) {
  return allMajors.find(
    (item) => item.university.slug === universitySlug && item.major.slug === majorSlug,
  );
}

export function ComparisonTool() {
  const [universityA, setUniversityA] = useState(universities[0]?.slug ?? "");
  const [universityB, setUniversityB] = useState(universities[1]?.slug ?? "");
  const [majorA, setMajorA] = useState(
    getMajorOptions(universities[0]?.slug ?? "")[0]?.slug ?? "",
  );
  const [majorB, setMajorB] = useState(
    getMajorOptions(universities[1]?.slug ?? "")[0]?.slug ?? "",
  );

  const deferredA = useDeferredValue(majorA);
  const deferredB = useDeferredValue(majorB);

  const optionsA = getMajorOptions(universityA);
  const optionsB = getMajorOptions(universityB);

  const entryA = getComparisonEntry(universityA, deferredA);
  const entryB = getComparisonEntry(universityB, deferredB);

  function swapSides() {
    setUniversityA(universityB);
    setUniversityB(universityA);
    setMajorA(majorB);
    setMajorB(majorA);
  }

  return (
    <div className="surface-card rounded-[32px] p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/12 text-brand">
            <ArrowLeftRight className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Compare two study paths
            </h3>
            <p className="text-sm leading-7 text-ink-muted">
              Demo comparison based on current mock data.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={swapSides}
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink"
        >
          Swap selections
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          University A
          <select
            value={universityA}
            onChange={(event) => {
              const nextValue = event.target.value;
              setUniversityA(nextValue);
              setMajorA(getMajorOptions(nextValue)[0]?.slug ?? "");
            }}
            className="rounded-2xl border border-border px-4 py-3 outline-none transition focus:border-brand"
          >
            {universities.map((university) => (
              <option key={university.slug} value={university.slug}>
                {university.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          University B
          <select
            value={universityB}
            onChange={(event) => {
              const nextValue = event.target.value;
              setUniversityB(nextValue);
              setMajorB(getMajorOptions(nextValue)[0]?.slug ?? "");
            }}
            className="rounded-2xl border border-border px-4 py-3 outline-none transition focus:border-brand"
          >
            {universities.map((university) => (
              <option key={university.slug} value={university.slug}>
                {university.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Major A
          <select
            value={majorA}
            onChange={(event) => setMajorA(event.target.value)}
            className="rounded-2xl border border-border px-4 py-3 outline-none transition focus:border-brand"
          >
            {optionsA.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Major B
          <select
            value={majorB}
            onChange={(event) => setMajorB(event.target.value)}
            className="rounded-2xl border border-border px-4 py-3 outline-none transition focus:border-brand"
          >
            {optionsB.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {[entryA, entryB].map((entry, index) =>
          entry ? (
            <div
              key={`${entry.university.slug}-${entry.major.slug}`}
              className="rounded-[28px] border border-border bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Option {index + 1}
              </p>
              <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                {entry.major.name}
              </h4>
              <p className="mt-1 text-sm font-medium text-ink-muted">
                {entry.university.name}
              </p>
              <dl className="mt-5 grid gap-4 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Description</dt>
                  <dd className="mt-1 leading-7 text-ink-muted">
                    {entry.major.description}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Requirements</dt>
                  <dd className="mt-1 leading-7 text-ink-muted">
                    {formatInlineList(entry.major.requirements)}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Fees</dt>
                  <dd className="mt-1 leading-7 text-ink-muted">
                    {entry.major.fees}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Academic plan</dt>
                  <dd className="mt-1 leading-7 text-ink-muted">
                    {formatInlineList(entry.major.academicPlan)}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Reviews</dt>
                  <dd className="mt-1 leading-7 text-ink-muted">
                    {entry.major.review}
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
            <div
              key={`empty-${index}`}
              className="rounded-[28px] border border-dashed border-border bg-surface-muted p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Option {index + 1}
              </p>
              <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                Comparison unavailable
              </h4>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                Choose another university or major combination to populate this
                side of the comparison.
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
