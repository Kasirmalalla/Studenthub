"use client";

import { useDeferredValue, useState } from "react";

import Link from "next/link";

import { jobs } from "@/data/work";
import { formatInlineList } from "@/lib/utils";

const ALL_WORK_MODES = "All work modes";
const ALL_LOCATIONS = "All locations";

const workModes = [ALL_WORK_MODES, ...Array.from(new Set(jobs.map((job) => job.workMode)))];
const locations = [ALL_LOCATIONS, ...Array.from(new Set(jobs.map((job) => job.location)))];

export function JobBoard() {
  const [mode, setMode] = useState(ALL_WORK_MODES);
  const [location, setLocation] = useState(ALL_LOCATIONS);

  const deferredMode = useDeferredValue(mode);
  const deferredLocation = useDeferredValue(location);

  const filtered = jobs.filter((job) => {
    const matchesMode = deferredMode === ALL_WORK_MODES || job.workMode === deferredMode;
    const matchesLocation =
      deferredLocation === ALL_LOCATIONS || job.location === deferredLocation;

    return matchesMode && matchesLocation;
  });

  const hasActiveFilters =
    deferredMode !== ALL_WORK_MODES || deferredLocation !== ALL_LOCATIONS;

  function resetFilters() {
    setMode(ALL_WORK_MODES);
    setLocation(ALL_LOCATIONS);
  }

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-[28px] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-ink">Filter opportunities</p>
            <p className="mt-1 text-sm text-ink-muted">
              {filtered.length} role{filtered.length === 1 ? "" : "s"} shown
            </p>
          </div>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink"
            >
              Reset filters
            </button>
          ) : null}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Work mode
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value)}
              className="rounded-2xl border border-border px-4 py-3 outline-none transition focus:border-brand"
            >
              {workModes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Location
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="rounded-2xl border border-border px-4 py-3 outline-none transition focus:border-brand"
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-4">
          {filtered.map((job) => (
            <Link
              key={job.slug}
              href={`/work/jobs/${job.slug}`}
              className="surface-card rounded-[28px] p-6 transition hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {job.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-ink-muted">
                    {formatInlineList([job.company, job.location, job.workMode])}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">
                    {job.description}
                  </p>
                </div>
                <span className="rounded-full border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-ink">
                  Apply now
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="surface-card rounded-[28px] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            No matches yet
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
            No openings match the current filters.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
            Try a broader location or work mode to view more graduate-friendly
            roles. This keeps the experience helpful instead of leaving users in
            a dead end.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-soft"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
