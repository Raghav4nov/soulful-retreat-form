// Mirrors the HEADERS array in scripts/google-sheets-webhook.gs — keep both in sync.
export const REGISTRANT_FIELDS = [
  "Submitted At",
  "Full Name",
  "WhatsApp",
  "Email",
  "Intentions",
  "Experiences",
  "Experience Type",
  "Outdoor Comfort",
  "Special Requests",
  "Travelling From Outside",
  "Travel Mode",
  "Travel Guidance",
  "Accommodation",
  "Companion Name",
  "Food Preference",
  "Has Allergies",
  "Allergy Details",
  "Food Notes",
  "Emergency Contact Name",
  "Emergency Contact Number",
  "Emergency Relationship",
  "Activity Notes",
  "Registration Intent",
  "UTR Number",
  "Policy Agreement",
] as const;

export type RegistrantField = (typeof REGISTRANT_FIELDS)[number];

export type Registrant = { _row: number } & Record<RegistrantField, string>;

export const READY_TO_REGISTER_LABEL = "I'm ready to register";
export const KNOW_MORE_LABEL = "I'd like to know more before registering";
export const SPEAK_TEAM_LABEL = "I'd like to speak with the team";

// The columns shown directly in the table; everything else is visible in the
// detail view when a row is opened.
export const TABLE_COLUMNS: RegistrantField[] = [
  "Submitted At",
  "Full Name",
  "WhatsApp",
  "Email",
  "Registration Intent",
];
