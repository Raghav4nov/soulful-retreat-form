import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { EXPERIENCE_TYPE_OPTIONS, OUTDOOR_COMFORT_OPTIONS } from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextAreaField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";

type Step4ExperienceProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step4Experience({ onNext, onBack }: Step4ExperienceProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <StepHeading>How Would You Like To Experience The Retreat?</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="experienceType"
          control={control}
          render={({ field }) => (
            <PillGroup
              label="What kind of experience are you looking for?"
              options={EXPERIENCE_TYPE_OPTIONS}
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
              label="Are you comfortable participating in outdoor/nature-based activities?"
              options={OUTDOOR_COMFORT_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.outdoorComfort?.message}
            />
          )}
        />
        <TextAreaField
          label="Is there anything you'd particularly like our team to arrange or keep in mind to make your retreat experience more comfortable?"
          placeholder="Share anything that would help us take care of you"
          registration={register("specialRequests")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
