"use client";

import { type FormEvent, useState } from "react";

import {
  submitDemoFormSubmission,
  type DemoSubmissionReceipt,
} from "@/lib/form-submissions";
import { cn } from "@/lib/utils";

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

type DemoFormProps = {
  formId: string;
  title: string;
  description: string;
  submitLabel: string;
  successMessage: string;
  fields: FieldConfig[];
  className?: string;
};

export function DemoForm({
  formId,
  title,
  description,
  submitLabel,
  successMessage,
  fields,
  className,
}: DemoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<DemoSubmissionReceipt | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(
      fields.map((field) => [field.name, String(formData.get(field.name) ?? "")]),
    );

    setError(null);
    setIsSubmitting(true);

    try {
      const nextReceipt = await submitDemoFormSubmission({
        formId,
        values,
      });

      form.reset();
      setReceipt(nextReceipt);
    } catch {
      setError("Something interrupted the demo submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn("surface-card rounded-[28px] p-6 sm:p-8", className)}>
      <div className="mb-6 space-y-3">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h3>
        <p className="text-sm leading-7 text-ink-muted">{description}</p>
      </div>
      {!receipt ? (
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name} className="grid gap-2 text-sm font-medium text-ink">
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  required={field.required ?? true}
                  placeholder={field.placeholder}
                  rows={5}
                  className="rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required ?? true}
                  className="rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type ?? "text"}
                  name={field.name}
                  required={field.required ?? true}
                  placeholder={field.placeholder}
                  className="rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
                />
              )}
            </label>
          ))}

          {error ? (
            <div
              className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              aria-live="polite"
            >
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex items-center justify-center rounded-full border border-brand bg-brand px-5 py-3 text-sm font-semibold text-ink transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : submitLabel}
          </button>
        </form>
      ) : (
        <div
          className="rounded-[24px] border border-brand/25 bg-brand/10 p-5 text-sm leading-7 text-ink"
          aria-live="polite"
        >
          <p className="font-semibold text-ink">Submission captured</p>
          <p className="mt-2">{successMessage}</p>
          <p className="mt-2 text-sm text-ink-muted">{receipt.message}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink-muted">
            <span>{receipt.reference}</span>
            <span>{receipt.submittedAt}</span>
          </div>
        </div>
      )}
    </div>
  );
}
