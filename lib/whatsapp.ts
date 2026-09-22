// Builds a wa.me link from a stored WhatsApp number. Indian numbers are
// sometimes saved with a country code and sometimes without, so a bare
// 10-digit number is assumed to be Indian and gets "91" prefixed.
// The value comes straight from a Google Sheets cell, which stores a
// number (not text) whenever it looks like one, so it isn't always a
// string despite the column's usual content - hence the String() coercion.
export function toWhatsAppLink(rawNumber: unknown): string | null {
  const digits = String(rawNumber ?? "").replace(/\D/g, "");
  if (!digits) return null;
  const withCountryCode = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${withCountryCode}`;
}
