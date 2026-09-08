import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { FOOD_PREFERENCE_OPTIONS, YES_NO_OPTIONS } from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextAreaField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";

type Step6FoodProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step6Food({ onNext, onBack }: Step6FoodProps) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  const hasAllergies = watch("hasAllergies");

  return (
    <div>
      <StepHeading>Nourish Your Body</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="foodPreference"
          control={control}
          render={({ field }) => (
            <PillGroup
              label="Food preference"
              options={FOOD_PREFERENCE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.foodPreference?.message}
            />
          )}
        />

        <Controller
          name="hasAllergies"
          control={control}
          render={({ field }) => (
            <PillGroup
              label="Do you have any food allergies or dietary restrictions?"
              options={YES_NO_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.hasAllergies?.message}
            />
          )}
        />

        {hasAllergies === "yes" && (
          <TextAreaField
            label="Please tell us about them"
            placeholder="List any allergies or dietary restrictions"
            registration={register("allergyDetails")}
            error={errors.allergyDetails?.message}
          />
        )}

        <TextAreaField
          label="Is there anything else about your food preferences we should know?"
          placeholder="Anything else we should keep in mind"
          registration={register("foodNotes")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
