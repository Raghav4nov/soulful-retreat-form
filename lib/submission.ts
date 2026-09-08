import type { FormValues } from "@/schema/formSchema";
import {
  INTENTION_OPTIONS,
  EXPERIENCE_OPTIONS,
  EXPERIENCE_TYPE_OPTIONS,
  OUTDOOR_COMFORT_OPTIONS,
  YES_NO_OPTIONS,
  TRAVEL_MODE_OPTIONS,
  TRAVEL_GUIDANCE_OPTIONS,
  ACCOMMODATION_OPTIONS,
  FOOD_PREFERENCE_OPTIONS,
  RELATIONSHIP_OPTIONS,
  REGISTRATION_INTENT_OPTIONS,
  type Option,
} from "@/schema/options";

// Submissions are always recorded in English, regardless of which
// language the visitor filled the form in, so the sheet stays consistent.
function labelFor(options: Option[], value: string): string {
  const match = options.find((option) => option.value === value);
  return match ? match.label.en : value;
}

function labelsFor(options: Option[], values: string[]): string {
  return values.map((value) => labelFor(options, value)).join(", ");
}

export function buildSubmissionPayload(data: FormValues) {
  return {
    submittedAt: new Date().toISOString(),
    fullName: data.fullName,
    whatsapp: data.whatsapp,
    email: data.email,
    intentions: labelsFor(INTENTION_OPTIONS, data.intentions),
    experiences: labelsFor(EXPERIENCE_OPTIONS, data.experiences),
    experienceType: labelFor(EXPERIENCE_TYPE_OPTIONS, data.experienceType),
    outdoorComfort: labelFor(OUTDOOR_COMFORT_OPTIONS, data.outdoorComfort),
    specialRequests: data.specialRequests || "",
    travellingFromOutside: labelFor(YES_NO_OPTIONS, data.travellingFromOutside),
    travelMode: data.travelMode ? labelFor(TRAVEL_MODE_OPTIONS, data.travelMode) : "",
    travelGuidance: data.travelGuidance ? labelFor(TRAVEL_GUIDANCE_OPTIONS, data.travelGuidance) : "",
    accommodationPreference: labelFor(ACCOMMODATION_OPTIONS, data.accommodationPreference),
    companionName: data.companionName || "",
    foodPreference: labelFor(FOOD_PREFERENCE_OPTIONS, data.foodPreference),
    hasAllergies: labelFor(YES_NO_OPTIONS, data.hasAllergies),
    allergyDetails: data.allergyDetails || "",
    foodNotes: data.foodNotes || "",
    emergencyContactName: data.emergencyContactName,
    emergencyContactNumber: data.emergencyContactNumber,
    emergencyRelationship: labelFor(RELATIONSHIP_OPTIONS, data.emergencyRelationship),
    activityNotes: data.activityNotes || "",
    registrationIntent: labelFor(REGISTRATION_INTENT_OPTIONS, data.registrationIntent),
    utrNumber: data.utrNumber || "",
    policyAgreement: data.policyAgreement ? "Yes" : "No",
  };
}

export type SubmissionPayload = ReturnType<typeof buildSubmissionPayload>;
