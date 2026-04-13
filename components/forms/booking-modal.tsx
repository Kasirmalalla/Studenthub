"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";

import { CalendarDays, CheckCircle2, Clock3, Mail, WalletCards, X } from "lucide-react";

import type { BookingOption } from "@/data/types";
import {
  submitBookingRequest,
  type DemoSubmissionReceipt,
} from "@/lib/form-submissions";
import { cn, slugify } from "@/lib/utils";

type BookingModalProps = {
  serviceSlug?: string;
  title: string;
  description: string;
  options: BookingOption[];
  sourcePath?: string;
  triggerLabel?: string;
  className?: string;
};

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function BookingModal({
  serviceSlug,
  title,
  description,
  options,
  sourcePath,
  triggerLabel = "Book now",
  className,
}: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<DemoSubmissionReceipt | null>(null);

  const dialogId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const resolvedServiceSlug = serviceSlug ?? slugify(title);
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-description`;

  const getFocusableElements = () =>
    Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
    );

  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const autofocusTarget =
        modalRef.current?.querySelector<HTMLElement>("[data-autofocus='true']") ??
        getFocusableElements()[0];
      autofocusTarget?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements();
      if (!focusable.length) {
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedOptionId =
      String(formData.get("bookingOptionId") ?? options[0]?.id ?? "").trim();
    const selectedOption = options.find((option) => option.id === selectedOptionId);

    if (!selectedOption) {
      setError("Please choose a session option before submitting your booking request.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const nextReceipt = await submitBookingRequest({
        serviceSlug: resolvedServiceSlug,
        serviceTitle: title,
        optionId: selectedOption.id,
        optionLabel: selectedOption.label,
        fullName: String(formData.get("fullName") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        notes: String(formData.get("notes") ?? "").trim(),
        sourcePath,
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
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => {
          setOpen(true);
          setError(null);
          setReceipt(null);
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-soft",
          className,
        )}
      >
        <CalendarDays className="h-4 w-4 text-brand" />
        {triggerLabel}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            ref={modalRef}
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="surface-card max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[32px] p-6 sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                  Booking request
                </p>
                <h3
                  id={titleId}
                  className="font-display text-2xl font-semibold tracking-tight text-ink"
                >
                  {title}
                </h3>
                <p
                  id={descriptionId}
                  className="text-sm leading-7 text-ink-muted"
                >
                  {description}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition hover:border-ink"
                aria-label="Close booking modal"
                onClick={closeModal}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!receipt ? (
              <form className="grid gap-4" onSubmit={handleSubmit}>
                {options.length > 1 ? (
                  <fieldset className="grid gap-3">
                    <legend className="text-sm font-medium text-ink">
                      Select a package
                    </legend>
                    {options.map((option, index) => (
                      <label key={option.id} className="block">
                        <input
                          type="radio"
                          name="bookingOptionId"
                          value={option.id}
                          required
                          defaultChecked={index === 0}
                          className="peer sr-only"
                        />
                        <div className="rounded-[24px] border border-border bg-white p-4 transition peer-checked:border-brand peer-checked:bg-brand/8">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-ink">
                                {option.label}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-3 text-xs text-ink-muted">
                                <span className="inline-flex items-center gap-1.5">
                                  <Clock3 className="h-3.5 w-3.5 text-brand" />
                                  {option.duration}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                  <WalletCards className="h-3.5 w-3.5 text-brand" />
                                  {option.price}
                                </span>
                              </div>
                            </div>
                          </div>
                          {option.note ? (
                            <p className="mt-3 text-xs leading-6 text-ink-muted">
                              {option.note}
                            </p>
                          ) : null}
                        </div>
                      </label>
                    ))}
                  </fieldset>
                ) : options[0] ? (
                  <>
                    <input
                      type="hidden"
                      name="bookingOptionId"
                      value={options[0].id}
                    />
                    <div className="rounded-[24px] border border-brand/25 bg-brand/10 p-4">
                      <p className="text-sm font-semibold text-ink">
                        {options[0].label}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-ink-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5 text-brand" />
                          {options[0].duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <WalletCards className="h-3.5 w-3.5 text-brand" />
                          {options[0].price}
                        </span>
                      </div>
                      {options[0].note ? (
                        <p className="mt-3 text-xs leading-6 text-ink-muted">
                          {options[0].note}
                        </p>
                      ) : null}
                    </div>
                  </>
                ) : null}

                <label className="grid gap-2 text-sm font-medium text-ink">
                  Full name
                  <input
                    required
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    data-autofocus="true"
                    className="rounded-2xl border border-border px-4 py-3 outline-none transition focus:border-brand"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  Email
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full rounded-2xl border border-border py-3 pl-11 pr-4 outline-none transition focus:border-brand"
                      placeholder="you@example.com"
                    />
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  Notes
                  <textarea
                    name="notes"
                    rows={4}
                    className="rounded-2xl border border-border px-4 py-3 outline-none transition focus:border-brand"
                    placeholder="Share what you need help with."
                  />
                </label>

                {error ? (
                  <div
                    className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    aria-live="polite"
                  >
                    {error}
                  </div>
                ) : null}

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full border border-brand bg-brand px-5 py-3 text-sm font-semibold text-ink transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Submit booking request"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div
                className="rounded-[24px] border border-brand/30 bg-brand/10 p-5 text-sm leading-7 text-ink"
                aria-live="polite"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Demo booking captured</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                      {receipt.reference}
                    </p>
                  </div>
                </div>
                <p className="mt-4">{receipt.message}</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Submitted at {receipt.submittedAt}. In the live product this
                  would continue into confirmation, payment, and calendar
                  booking.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setReceipt(null);
                      setError(null);
                    }}
                    className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
                  >
                    Book another option
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-soft"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
