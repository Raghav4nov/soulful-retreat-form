import { useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { TextField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";

type Step2AboutProps = {
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
};

export default function Step2About({ onNext, onBack, nextDisabled }: Step2AboutProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t } = useLanguage();

  return (
    <div>
      <StepHeading>{t.step2.heading}</StepHeading>
      <div className="mt-8 flex flex-col gap-6">
        <TextField
          label={t.step2.fullNameLabel}
          placeholder={t.step2.fullNamePlaceholder}
          registration={register("fullName")}
          error={errors.fullName?.message}
        />
        <TextField
          label={t.step2.whatsappLabel}
          placeholder={t.step2.whatsappPlaceholder}
          type="tel"
          registration={register("whatsapp")}
          error={errors.whatsapp?.message}
        />
        <TextField
          label={t.step2.emailLabel}
          placeholder={t.step2.emailPlaceholder}
          type="email"
          registration={register("email")}
          error={errors.email?.message}
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextDisabled={nextDisabled} />
    </div>
  );
}
