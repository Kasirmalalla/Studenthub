import type { BookingOption, BookingService } from "@/data/types";
import { formatInlineList, groupBy, slugify } from "@/lib/utils";

type BookingOptionInput = {
  id?: string;
  label?: string;
  duration: string;
  price: string;
  note?: string;
};

type BookingServiceInput = {
  slug: string;
  title: string;
  description: string;
  href: string;
  category: string;
};

export function createBookingOption(
  serviceSlug: string,
  { id, label, duration, price, note }: BookingOptionInput,
): BookingOption {
  const resolvedLabel = label ?? `${duration} / ${price}`;

  return {
    id: id ?? `${serviceSlug}-${slugify(resolvedLabel)}`,
    label: resolvedLabel,
    duration,
    price,
    note,
  };
}

export function summarizeBookingOptions(options: BookingOption[]) {
  return {
    durationSummary: formatInlineList(options.map((option) => option.duration)),
    priceSummary: formatInlineList(options.map((option) => option.price)),
  };
}

export function createBookingService(
  service: BookingServiceInput,
  options: BookingOption[],
): BookingService {
  const { durationSummary, priceSummary } = summarizeBookingOptions(options);

  return {
    ...service,
    durationSummary,
    priceSummary,
    options,
  };
}

export function groupBookingServicesByCategory(services: BookingService[]) {
  return groupBy(services, (service) => service.category);
}
