// Single source of truth for retreat pricing. The total is driven entirely
// by the chosen accommodation type - update the map below to change prices
// everywhere they're shown (registration flow, landing page, payment
// QR/links, and the submitted "Amount Due" sheet column).
// Keys match the "value" fields in ACCOMMODATION_OPTIONS (schema/options.ts).
export const ACCOMMODATION_PRICES: Record<string, number> = {
  dormitory: 10999,
  triple: 14999,
  double: 15999,
  single: 19999,
};

export const LOWEST_PRICE = Math.min(...Object.values(ACCOMMODATION_PRICES));
export const HIGHEST_PRICE = Math.max(...Object.values(ACCOMMODATION_PRICES));

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

// Reverses formatInr for sheet values like "₹14,999" (or "—" for an empty
// cell), so the admin dashboard can sum "Amount Due" into real totals.
export function parseInr(formatted: string | undefined): number {
  if (!formatted) return 0;
  const digits = formatted.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function getTotalPrice(accommodationPreference: string | undefined): number {
  if (!accommodationPreference) return 0;
  return ACCOMMODATION_PRICES[accommodationPreference] ?? 0;
}
