import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import {
  YES_NO_OPTIONS,
  TRAVEL_MODE_OPTIONS,
  TRAVEL_GUIDANCE_OPTIONS,
  ACCOMMODATION_OPTIONS,
  localizeOptions,
} from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";

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
  const { t, locale } = useLanguage();

  const travellingFromOutside = watch("travellingFromOutside");

  return (
    <div>
      <StepHeading>{t.step5.heading}</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="travellingFromOutside"
          control={control}
          render={({ field }) => (
            <PillGroup
              label={t.step5.travellingFromOutsideQuestion}
              options={localizeOptions(YES_NO_OPTIONS, locale)}
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
                  label={t.step5.travelModeQuestion}
                  options={localizeOptions(TRAVEL_MODE_OPTIONS, locale)}
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
                  label={t.step5.travelGuidanceQuestion}
                  options={localizeOptions(TRAVEL_GUIDANCE_OPTIONS, locale)}
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
              label={t.step5.accommodationLabel}
              options={localizeOptions(ACCOMMODATION_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.accommodationPreference?.message}
            />
          )}
        />

        <TextField
          label={t.step5.companionLabel}
          placeholder={t.step5.companionPlaceholder}
          registration={register("companionName")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
