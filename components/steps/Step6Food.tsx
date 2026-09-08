import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { FOOD_PREFERENCE_OPTIONS, YES_NO_OPTIONS, localizeOptions } from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextAreaField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";

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
  const { t, locale } = useLanguage();

  const hasAllergies = watch("hasAllergies");

  return (
    <div>
      <StepHeading>{t.step6.heading}</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="foodPreference"
          control={control}
          render={({ field }) => (
            <PillGroup
              label={t.step6.foodPreferenceLabel}
              options={localizeOptions(FOOD_PREFERENCE_OPTIONS, locale)}
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
              label={t.step6.hasAllergiesQuestion}
              options={localizeOptions(YES_NO_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.hasAllergies?.message}
            />
          )}
        />

        {hasAllergies === "yes" && (
          <TextAreaField
            label={t.step6.allergyDetailsLabel}
            placeholder={t.step6.allergyDetailsPlaceholder}
            registration={register("allergyDetails")}
            error={errors.allergyDetails?.message}
          />
        )}

        <TextAreaField
          label={t.step6.foodNotesLabel}
          placeholder={t.step6.foodNotesPlaceholder}
          registration={register("foodNotes")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
