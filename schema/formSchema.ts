import { z } from "zod";

const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;

export type ValidationMessages = {
  intentionsRequired: string;
  experiencesRequired: string;
  fullNameRequired: string;
  whatsappInvalid: string;
  emailInvalid: string;
  selectOption: string;
  travelModeRequired: string;
  allergyDetailsRequired: string;
  emergencyNameRequired: string;
  phoneInvalid: string;
  utrRequired: string;
  utrInvalid: string;
  policyRequired: string;
};

// A real UPI transaction reference (UTR/RRN) is always exactly 12 digits -
// this won't catch someone typing 12 random digits, but it stops the
// common case of a placeholder value like "123" or "test" being accepted
// as a payment reference.
const utrRegex = /^\d{12}$/;

export function createFormSchema(messages: ValidationMessages) {
  return z
    .object({
      // Step 3 — Intentions & experiences
      intentions: z.array(z.string()).min(1, messages.intentionsRequired),
      experiences: z.array(z.string()).min(1, messages.experiencesRequired),

      // Step 2 — About you
      fullName: z.string().min(2, messages.fullNameRequired),
      whatsapp: z.string().regex(phoneRegex, messages.whatsappInvalid),
      email: z.string().email(messages.emailInvalid),

      // Step 4 — Retreat experience
      experienceType: z.string().min(1, messages.selectOption),
      outdoorComfort: z.string().min(1, messages.selectOption),
      specialRequests: z.string().optional(),

      // Step 5 — Travel & accommodation
      travellingFromOutside: z.string().min(1, messages.selectOption),
      travelMode: z.string().optional(),
      travelGuidance: z.string().optional(),
      accommodationPreference: z.string().min(1, messages.selectOption),
      companionName: z.string().optional(),

      // Step 6 — Food & preferences
      foodPreference: z.string().min(1, messages.selectOption),
      hasAllergies: z.string().min(1, messages.selectOption),
      allergyDetails: z.string().optional(),
      foodNotes: z.string().optional(),

      // Step 7 — Emergency information
      emergencyContactName: z.string().min(2, messages.emergencyNameRequired),
      emergencyContactNumber: z.string().regex(phoneRegex, messages.phoneInvalid),
      emergencyRelationship: z.string().min(1, messages.selectOption),
      activityNotes: z.string().optional(),

      // Step 8 — Registration summary
      registrationIntent: z.string().min(1, messages.selectOption),
      deluxeRoomUpgrade: z.boolean().optional(),

      // Step 9 — Payment
      utrNumber: z.string().optional(),
      policyAgreement: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.travellingFromOutside === "yes") {
        if (!data.travelMode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["travelMode"],
            message: messages.travelModeRequired,
          });
        }
        if (!data.travelGuidance) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["travelGuidance"],
            message: messages.selectOption,
          });
        }
      }

      if (data.hasAllergies === "yes" && !data.allergyDetails?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["allergyDetails"],
          message: messages.allergyDetailsRequired,
        });
      }

      if (data.registrationIntent === "ready") {
        const utr = data.utrNumber?.trim() ?? "";
        if (!utr) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["utrNumber"],
            message: messages.utrRequired,
          });
        } else if (!utrRegex.test(utr)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["utrNumber"],
            message: messages.utrInvalid,
          });
        }
        if (!data.policyAgreement) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["policyAgreement"],
            message: messages.policyRequired,
          });
        }
      }
    });
}

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

export const defaultValues: FormValues = {
  intentions: [],
  experiences: [],
  fullName: "",
  whatsapp: "",
  email: "",
  experienceType: "",
  outdoorComfort: "",
  specialRequests: "",
  travellingFromOutside: "",
  travelMode: "",
  travelGuidance: "",
  accommodationPreference: "",
  companionName: "",
  foodPreference: "",
  hasAllergies: "",
  allergyDetails: "",
  foodNotes: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  emergencyRelationship: "",
  activityNotes: "",
  registrationIntent: "",
  deluxeRoomUpgrade: false,
  utrNumber: "",
  policyAgreement: false,
};
