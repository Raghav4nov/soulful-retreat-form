"use client";

import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";

import { createFormSchema, defaultValues, type FormValues } from "@/schema/formSchema";
import AnimatedStep from "@/components/AnimatedStep";
import BackgroundDecor from "@/components/ui/BackgroundDecor";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/types";

import Step1Welcome from "@/components/steps/Step1Welcome";
import Step2About from "@/components/steps/Step2About";
import Step3Intentions from "@/components/steps/Step3Intentions";
import Step4Experience from "@/components/steps/Step4Experience";
import Step5Travel from "@/components/steps/Step5Travel";
import Step6Food from "@/components/steps/Step6Food";
import Step7Emergency from "@/components/steps/Step7Emergency";
import Step8Summary from "@/components/steps/Step8Summary";
import Step9Payment from "@/components/steps/Step9Payment";
import Step10Confirmation from "@/components/steps/Step10Confirmation";

const TOTAL_STEPS = 10;
const FORM_STEP_COUNT = 8; // Steps 2 through 9 count toward progress

const stepFieldMap: Record<number, (keyof FormValues)[]> = {
  1: [],
  2: ["fullName", "whatsapp", "email"],
  3: ["intentions", "experiences"],
  4: ["experienceType", "outdoorComfort"],
  5: ["travellingFromOutside", "travelMode", "travelGuidance", "accommodationPreference"],
  6: ["foodPreference", "hasAllergies", "allergyDetails"],
  7: ["emergencyContactName", "emergencyContactNumber", "emergencyRelationship"],
  8: ["registrationIntent"],
  9: ["utrNumber", "policyAgreement"],
  10: [],
};

export default function MultiStepForm() {
  return (
    <LanguageProvider>
      <MultiStepFormInner />
    </LanguageProvider>
  );
}

function MultiStepFormInner() {
  const [step, setStep] = useState(1);
  const { t, locale } = useLanguage();

  const localeRef = useRef<Locale>("en");
  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  const methods = useForm<FormValues>({
    resolver: (values, context, options) => {
      const schema = createFormSchema(translations[localeRef.current].validation);
      return zodResolver(schema)(values, context, options);
    },
    defaultValues,
    mode: "onSubmit",
  });

  const { trigger, handleSubmit, getValues } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("Registration submitted:", data);
  };

  const goNext = async () => {
    const fields = stepFieldMap[step];
    const isValid = fields.length ? await trigger(fields) : true;
    if (!isValid) return;

    if (step === 8) {
      if (getValues("registrationIntent") === "ready") {
        setStep(9);
      } else {
        await handleSubmit(onSubmit)();
        setStep(10);
      }
      return;
    }

    if (step === 9) {
      await handleSubmit(onSubmit)();
      setStep(10);
      return;
    }

    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  };

  const goBack = () => setStep((current) => Math.max(current - 1, 1));

  const showProgress = step > 1 && step < 10;
  const progressStep = step - 1;

  return (
    <FormProvider {...methods}>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-10 sm:py-16">
        <BackgroundDecor />
        <div className="relative z-10 w-full max-w-xl">
          <h1 className="font-playfair mb-4 text-center text-lg text-forest sm:text-xl">
            {t.common.appTitle}
          </h1>

          <div className="mb-4 flex justify-end">
            <LanguageToggle />
          </div>

          {showProgress && (
            <div className="mb-8">
              <div className="mb-2 flex justify-between font-sans text-xs text-charcoal/60">
                <span>{t.common.formatStep(progressStep, FORM_STEP_COUNT)}</span>
                <span>{Math.round((progressStep / FORM_STEP_COUNT) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-sage/30">
                <div
                  className="h-1.5 rounded-full bg-forest transition-all duration-500"
                  style={{ width: `${(progressStep / FORM_STEP_COUNT) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-sage/40 bg-white/60 p-6 shadow-sm sm:p-10">
            <AnimatePresence mode="wait">
              <AnimatedStep key={step}>
                {step === 1 && <Step1Welcome onNext={goNext} />}
                {step === 2 && <Step2About onNext={goNext} onBack={goBack} />}
                {step === 3 && <Step3Intentions onNext={goNext} onBack={goBack} />}
                {step === 4 && <Step4Experience onNext={goNext} onBack={goBack} />}
                {step === 5 && <Step5Travel onNext={goNext} onBack={goBack} />}
                {step === 6 && <Step6Food onNext={goNext} onBack={goBack} />}
                {step === 7 && <Step7Emergency onNext={goNext} onBack={goBack} />}
                {step === 8 && <Step8Summary onNext={goNext} onBack={goBack} />}
                {step === 9 && <Step9Payment onNext={goNext} onBack={goBack} />}
                {step === 10 && <Step10Confirmation />}
              </AnimatedStep>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
