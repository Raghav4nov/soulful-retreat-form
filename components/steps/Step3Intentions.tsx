import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { INTENTION_OPTIONS, EXPERIENCE_OPTIONS, localizeOptions } from "@/schema/options";
import { PillMultiGroup } from "@/components/ui/PillGroup";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";

type Step3IntentionsProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step3Intentions({ onNext, onBack }: Step3IntentionsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t, locale } = useLanguage();

  return (
    <div>
      <StepHeading>{t.step3.heading}</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="intentions"
          control={control}
          render={({ field }) => (
            <PillMultiGroup
              label={t.step3.intentionsLabel}
              options={localizeOptions(INTENTION_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.intentions?.message as string | undefined}
            />
          )}
        />
        <Controller
          name="experiences"
          control={control}
          render={({ field }) => (
            <PillMultiGroup
              label={t.step3.experiencesLabel}
              options={localizeOptions(EXPERIENCE_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.experiences?.message as string | undefined}
            />
          )}
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
