// Single source of truth for retreat pricing. Update the two numbers below
// to change prices everywhere they're shown (registration flow, landing
// page, payment QR/links, and the submitted "Amount Due" sheet column).
export const BASE_PRICE = 10999;
export const DELUXE_ROOM_SURCHARGE = 4000;

// Matches the "deluxe" value in ACCOMMODATION_OPTIONS (schema/options.ts).
export const DELUXE_ACCOMMODATION_VALUE = "deluxe";

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getTotalPrice(accommodationPreference: string | undefined): number {
  return accommodationPreference === DELUXE_ACCOMMODATION_VALUE
    ? BASE_PRICE + DELUXE_ROOM_SURCHARGE
    : BASE_PRICE;
}
