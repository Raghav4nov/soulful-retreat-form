import { useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { useLanguage } from "@/i18n/LanguageContext";

type Step10ConfirmationProps = {
  submissionError?: boolean;
};

export default function Step10Confirmation({ submissionError }: Step10ConfirmationProps) {
  const { watch } = useFormContext<FormValues>();
  const { t } = useLanguage();
  const fullName = watch("fullName");

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="font-playfair text-2xl leading-snug text-forest sm:text-3xl">
        {t.step10.heading}
      </h2>

      <p className="mt-4 font-sans text-lg text-charcoal">
        {t.step10.thankYou(fullName || t.step10.guestFallback)}
      </p>
      <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-charcoal/70 sm:text-base">
        {t.step10.receivedPrefix} {t.brand.name} · {t.brand.dateLocation}
      </p>

      {submissionError && (
        <p className="mt-4 max-w-md rounded-2xl border border-red-300 bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
          {t.step10.submissionErrorNotice}
        </p>
      )}

      <p className="font-cormorant mt-6 text-xl italic text-sage sm:text-2xl">{t.step10.quote}</p>

      <div className="mt-10 flex w-full flex-col gap-4 text-left">
        {t.step10.steps.map((step, index) => (
          <div key={step.title} className="flex items-start gap-4">
            <span className="font-playfair text-lg text-forest">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="font-sans text-sm text-charcoal/80 sm:text-base">
              <span className="font-semibold text-charcoal">{step.title}</span>
              {step.description && ` ${step.description}`}
            </p>
          </div>
        ))}
      </div>

      <p className="font-playfair mt-10 text-lg text-forest sm:text-xl">{t.step10.finalText}</p>
    </div>
  );
}
