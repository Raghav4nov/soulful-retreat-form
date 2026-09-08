import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import {
  YES_NO_OPTIONS,
  TRAVEL_MODE_OPTIONS,
  TRAVEL_GUIDANCE_OPTIONS,
  ACCOMMODATION_OPTIONS,
} from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";

type Step5TravelProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step5Travel({ onNext, onBack }: Step5TravelProps) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const travellingFromOutside = watch("travellingFromOutside");

  return (
    <div>
      <StepHeading>Your Journey To Rishikesh</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="travellingFromOutside"
          control={control}
          render={({ field }) => (
            <PillGroup
              label="Are you travelling from outside Rishikesh?"
              options={YES_NO_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.travellingFromOutside?.message}
            />
          )}
        />

        {travellingFromOutside === "yes" && (
          <>
            <Controller
              name="travelMode"
              control={control}
              render={({ field }) => (
                <PillGroup
                  label="How will you be reaching Rishikesh?"
                  options={TRAVEL_MODE_OPTIONS}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.travelMode?.message}
                />
              )}
            />
            <Controller
              name="travelGuidance"
              control={control}
              render={({ field }) => (
                <PillGroup
                  label="Would you like guidance regarding reaching the retreat location?"
                  options={TRAVEL_GUIDANCE_OPTIONS}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.travelGuidance?.message}
                />
              )}
            />
          </>
        )}

        <Controller
          name="accommodationPreference"
          control={control}
          render={({ field }) => (
            <PillGroup
              label="Accommodation preference"
              options={ACCOMMODATION_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.accommodationPreference?.message}
            />
          )}
        />

        <TextField
          label="If you're coming with someone, please mention their name"
          placeholder="Companion's name"
          registration={register("companionName")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
