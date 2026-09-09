import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { EXPERIENCE_TYPE_OPTIONS, OUTDOOR_COMFORT_OPTIONS, localizeOptions } from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextAreaField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";

type Step4ExperienceProps = {
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
};

export default function Step4Experience({ onNext, onBack, nextDisabled }: Step4ExperienceProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t, locale } = useLanguage();

  return (
    <div>
      <StepHeading>{t.step4.heading}</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="experienceType"
          control={control}
          render={({ field }) => (
            <PillGroup
              label={t.step4.experienceTypeQuestion}
              options={localizeOptions(EXPERIENCE_TYPE_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.experienceType?.message}
            />
          )}
        />
        <Controller
          name="outdoorComfort"
          control={control}
          render={({ field }) => (
            <PillGroup
              label={t.step4.outdoorComfortQuestion}
              options={localizeOptions(OUTDOOR_COMFORT_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.outdoorComfort?.message}
            />
          )}
        />
        <TextAreaField
          label={t.step4.specialRequestsLabel}
          placeholder={t.step4.specialRequestsPlaceholder}
          registration={register("specialRequests")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextDisabled={nextDisabled} />
    </div>
  );
}
