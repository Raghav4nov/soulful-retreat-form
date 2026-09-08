import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { INTENTION_OPTIONS, EXPERIENCE_OPTIONS } from "@/schema/options";
import { PillMultiGroup } from "@/components/ui/PillGroup";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";

type Step3IntentionsProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step3Intentions({ onNext, onBack }: Step3IntentionsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <StepHeading>What Are You Hoping To Find Here?</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="intentions"
          control={control}
          render={({ field }) => (
            <PillMultiGroup
              label="What draws you to this retreat? (Select all that apply)"
              options={INTENTION_OPTIONS}
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
              label="Which experiences excite you most? (Select all that apply)"
              options={EXPERIENCE_OPTIONS}
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
