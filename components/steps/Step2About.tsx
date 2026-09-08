import { useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { TextField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";

type Step2AboutProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step2About({ onNext, onBack }: Step2AboutProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <StepHeading>Let&apos;s Get To Know You</StepHeading>
      <div className="mt-8 flex flex-col gap-6">
        <TextField
          label="Full name"
          placeholder="Your full name"
          registration={register("fullName")}
          error={errors.fullName?.message}
        />
        <TextField
          label="WhatsApp number"
          placeholder="e.g. +91 98765 43210"
          type="tel"
          registration={register("whatsapp")}
          error={errors.whatsapp?.message}
        />
        <TextField
          label="Email address"
          placeholder="you@example.com"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} />
    </div>
  );
}
