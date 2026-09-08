import { useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";

const NEXT_STEPS = [
  {
    number: "01",
    title: "Registration received.",
    description: "Our team will review your details.",
  },
  {
    number: "02",
    title: "Confirmation.",
    description: "We'll contact you on WhatsApp.",
  },
  {
    number: "03",
    title: "Retreat details.",
    description: "You'll receive the location, itinerary, and packing list.",
  },
  {
    number: "04",
    title: "Rishikesh awaits.",
    description: "",
  },
];

export default function Step10Confirmation() {
  const { watch } = useFormContext<FormValues>();
  const fullName = watch("fullName");

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="font-playfair text-2xl leading-snug text-forest sm:text-3xl">
        Welcome To The Journey
      </h2>

      <p className="mt-4 font-sans text-lg text-charcoal">
        Thank you, {fullName || "friend"}.
      </p>
      <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-charcoal/70 sm:text-base">
        We&apos;ve received your registration for: Soulful Healing Adventure ·
        Rishikesh · 14–15 November 2026
      </p>

      <p className="font-cormorant mt-6 text-xl italic text-sage sm:text-2xl">
        Same you. But a kinder, calmer, brighter version.
      </p>

      <div className="mt-10 flex w-full flex-col gap-4 text-left">
        {NEXT_STEPS.map((step) => (
          <div key={step.number} className="flex items-start gap-4">
            <span className="font-playfair text-lg text-forest">{step.number}</span>
            <p className="font-sans text-sm text-charcoal/80 sm:text-base">
              <span className="font-semibold text-charcoal">{step.title}</span>
              {step.description && ` ${step.description}`}
            </p>
          </div>
        ))}
      </div>

      <p className="font-playfair mt-10 text-lg text-forest sm:text-xl">
        Good People. Good Energy. Good Experiences.
        <br />
        See you in Rishikesh.
      </p>
    </div>
  );
}
