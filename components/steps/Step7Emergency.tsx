import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { RELATIONSHIP_OPTIONS, localizeOptions } from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextField, TextAreaField } from "@/components/ui/TextField";
import { StepHeading, StepIntro } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";

type Step7EmergencyProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step7Emergency({ onNext, onBack }: Step7EmergencyProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t, locale } = useLanguage();

  return (
    <div>
      <StepHeading>{t.step7.heading}</StepHeading>
      <StepIntro>{t.step7.intro}</StepIntro>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <TextField
            label={t.step7.contactNameLabel}
            placeholder={t.step7.contactNamePlaceholder}
            registration={register("emergencyContactName")}
            error={errors.emergencyContactName?.message}
          />
          <TextField
            label={t.step7.contactNumberLabel}
            placeholder={t.step7.contactNumberPlaceholder}
            type="tel"
            registration={register("emergencyContactNumber")}
            error={errors.emergencyContactNumber?.message}
          />
        </div>

        <Controller
          name="emergencyRelationship"
          control={control}
          render={({ field }) => (
            <PillGroup
              label={t.step7.relationshipLabel}
              options={localizeOptions(RELATIONSHIP_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.emergencyRelationship?.message}
            />
          )}
        />

        <TextAreaField
          label={t.step7.activityNotesLabel}
          placeholder={t.step7.activityNotesPlaceholder}
          registration={register("activityNotes")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
