import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { RELATIONSHIP_OPTIONS } from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextField, TextAreaField } from "@/components/ui/TextField";
import { StepHeading, StepIntro } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";

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

  return (
    <div>
      <StepHeading>Just For Your Safety</StepHeading>
      <StepIntro>
        We ask for these details only so our team can support you appropriately
        during the retreat.
      </StepIntro>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <TextField
            label="Emergency contact name"
            placeholder="Full name"
            registration={register("emergencyContactName")}
            error={errors.emergencyContactName?.message}
          />
          <TextField
            label="Emergency contact number"
            placeholder="e.g. +91 98765 43210"
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
              label="Relationship with emergency contact"
              options={RELATIONSHIP_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.emergencyRelationship?.message}
            />
          )}
        />

        <TextAreaField
          label="Is there anything our retreat team should be aware of regarding your participation in physical, outdoor or nature-based activities?"
          placeholder="Share anything relevant to your safety and comfort"
          registration={register("activityNotes")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
