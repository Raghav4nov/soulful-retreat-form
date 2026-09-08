import { z } from "zod";

const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;

export const formSchema = z
  .object({
    // Step 3 — Intentions & experiences
    intentions: z.array(z.string()).min(1, "Please select at least one intention"),
    experiences: z.array(z.string()).min(1, "Please select at least one experience"),

    // Step 2 — About you
    fullName: z.string().min(2, "Please enter your full name"),
    whatsapp: z.string().regex(phoneRegex, "Please enter a valid WhatsApp number"),
    email: z.string().email("Please enter a valid email address"),

    // Step 4 — Retreat experience
    experienceType: z.string().min(1, "Please select an option"),
    outdoorComfort: z.string().min(1, "Please select an option"),
    specialRequests: z.string().optional(),

    // Step 5 — Travel & accommodation
    travellingFromOutside: z.string().min(1, "Please select an option"),
    travelMode: z.string().optional(),
    travelGuidance: z.string().optional(),
    accommodationPreference: z.string().min(1, "Please select an option"),
    companionName: z.string().optional(),

    // Step 6 — Food & preferences
    foodPreference: z.string().min(1, "Please select an option"),
    hasAllergies: z.string().min(1, "Please select an option"),
    allergyDetails: z.string().optional(),
    foodNotes: z.string().optional(),

    // Step 7 — Emergency information
    emergencyContactName: z.string().min(2, "Please enter a name"),
    emergencyContactNumber: z.string().regex(phoneRegex, "Please enter a valid phone number"),
    emergencyRelationship: z.string().min(1, "Please select an option"),
    activityNotes: z.string().optional(),

    // Step 8 — Registration summary
    registrationIntent: z.string().min(1, "Please select an option"),

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
          message: "Please let us know how you'll be reaching Rishikesh",
        });
      }
      if (!data.travelGuidance) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["travelGuidance"],
          message: "Please select an option",
        });
      }
    }

    if (data.hasAllergies === "yes" && !data.allergyDetails?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["allergyDetails"],
        message: "Please tell us about your allergies or dietary restrictions",
      });
    }

    if (data.registrationIntent === "ready") {
      if (!data.utrNumber?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["utrNumber"],
          message: "Please enter your transaction / UTR number",
        });
      }
      if (!data.policyAgreement) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["policyAgreement"],
          message: "Please confirm to proceed",
        });
      }
    }
  });

export type FormValues = z.infer<typeof formSchema>;

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
  utrNumber: "",
  policyAgreement: false,
};
