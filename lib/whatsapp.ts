// Builds a wa.me link from a stored WhatsApp number. Indian numbers are
// sometimes saved with a country code and sometimes without, so a bare
// 10-digit number is assumed to be Indian and gets "91" prefixed.
export function toWhatsAppLink(rawNumber: string): string | null {
  const digits = rawNumber.replace(/\D/g, "");
  if (!digits) return null;
  const withCountryCode = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${withCountryCode}`;
}
