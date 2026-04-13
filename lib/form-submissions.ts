export type DemoFormSubmissionPayload = {
  formId: string;
  values: Record<string, string>;
};

export type BookingRequestPayload = {
  serviceSlug: string;
  serviceTitle: string;
  optionId: string;
  optionLabel: string;
  fullName: string;
  email: string;
  notes: string;
  sourcePath?: string;
};

export type DemoSubmissionReceipt = {
  reference: string;
  submittedAt: string;
  message: string;
};

const submissionFormatter = new Intl.DateTimeFormat("en-BH", {
  dateStyle: "medium",
  timeStyle: "short",
});

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildReference(prefix: string) {
  const entropy =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);

  return `${prefix}-${entropy.toUpperCase()}`;
}

export async function submitDemoFormSubmission({
  formId,
}: DemoFormSubmissionPayload): Promise<DemoSubmissionReceipt> {
  await wait(320);

  return {
    reference: buildReference(formId.toUpperCase()),
    submittedAt: submissionFormatter.format(new Date()),
    message:
      "This demo submission was captured successfully and is ready to be replaced with a real API call.",
  };
}

export async function submitBookingRequest({
  serviceTitle,
  optionLabel,
}: BookingRequestPayload): Promise<DemoSubmissionReceipt> {
  await wait(360);

  return {
    reference: buildReference("BKG"),
    submittedAt: submissionFormatter.format(new Date()),
    message: `Demo booking captured for ${serviceTitle} (${optionLabel}).`,
  };
}
