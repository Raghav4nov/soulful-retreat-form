// Single source of truth for retreat pricing. Update the two numbers below
// to change prices everywhere they're shown (registration flow, landing
// page, payment QR/links, and the submitted "Amount Due" sheet column).
export const BASE_PRICE = 10999;
export const DELUXE_ROOM_SURCHARGE = 4000;

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

export function getTotalPrice(hasDeluxeUpgrade: boolean | undefined): number {
  return hasDeluxeUpgrade ? BASE_PRICE + DELUXE_ROOM_SURCHARGE : BASE_PRICE;
}
