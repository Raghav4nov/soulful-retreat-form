import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { REGISTRATION_INTENT_OPTIONS } from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";

type Step8SummaryProps = {
  onNext: () => void;
  onBack: () => void;
};

const INCLUDES = [
  "Accommodation",
  "Meals",
  "Guided experiences",
  "Sound Healing",
  "Nature experiences",
  "Bonfire",
  "Community activities",
];

const NOT_INCLUDED = ["Travel to/from Rishikesh", "Personal expenses"];

export default function Step8Summary({ onNext, onBack }: Step8SummaryProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const registrationIntent = watch("registrationIntent");
  const isReady = registrationIntent === "ready";

  return (
    <div>
      <StepHeading>Your Place In The Journey</StepHeading>

      <div className="mt-8 rounded-3xl bg-forest p-6 text-ivory sm:p-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
          Soulful Healing Adventure
        </p>
        <p className="font-playfair mt-2 text-xl sm:text-2xl">
          Rishikesh · 14–15 November 2026
        </p>

        <div className="mt-6 border-t border-ivory/20 pt-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
            Retreat Investment
          </p>
          <p className="font-playfair mt-1 text-2xl">₹[Placeholder]</p>
        </div>

        <div className="mt-6 border-t border-ivory/20 pt-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
            Includes
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/90">
            {INCLUDES.join(" · ")}
          </p>
        </div>

        <div className="mt-6 border-t border-ivory/20 pt-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
            Not Included
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/90">
            {NOT_INCLUDED.join(" · ")}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Controller
          name="registrationIntent"
          control={control}
          render={({ field }) => (
            <PillGroup
              label="How would you like to proceed?"
              options={REGISTRATION_INTENT_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.registrationIntent?.message}
              columns={1}
            />
          )}
        />
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel={isReady ? "Continue to Payment" : "Submit Registration"}
      />
    </div>
  );
}
