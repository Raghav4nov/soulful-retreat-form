import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { REGISTRATION_INTENT_OPTIONS, localizeOptions } from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";
import { DELUXE_ROOM_SURCHARGE, formatInr, getTotalPrice } from "@/lib/pricing";

type Step8SummaryProps = {
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
};

export default function Step8Summary({ onNext, onBack, nextDisabled }: Step8SummaryProps) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t, locale } = useLanguage();

  const registrationIntent = watch("registrationIntent");
  const isReady = registrationIntent === "ready";
  const isDeluxe = watch("deluxeRoomUpgrade");
  const totalPrice = getTotalPrice(isDeluxe);

  return (
    <div>
      <StepHeading>{t.step8.heading}</StepHeading>

      <div className="mt-8 rounded-3xl bg-forest p-6 text-ivory sm:p-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
          {t.brand.name}
        </p>
        <p className="font-playfair mt-2 text-xl sm:text-2xl">{t.brand.dateLocation}</p>

        <div className="mt-6 border-t border-ivory/20 pt-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
            {t.step8.investmentLabel}
          </p>
          <p className="font-playfair mt-1 text-2xl">{t.step8.investmentValue}</p>

          <label className="mt-4 flex cursor-pointer items-center gap-3 font-sans text-sm text-ivory/90">
            <input
              type="checkbox"
              {...register("deluxeRoomUpgrade")}
              className="h-4 w-4 rounded border-ivory/50 accent-ivory focus:ring-ivory/30"
            />
            <span>{t.step8.deluxeUpgradeLabel}</span>
          </label>

          {isDeluxe && (
            <>
              <div className="mt-3 flex items-center justify-between font-sans text-sm text-ivory/90">
                <span>{t.step8.deluxeLineLabel}</span>
                <span>+{formatInr(DELUXE_ROOM_SURCHARGE)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-ivory/20 pt-3">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
                  {t.step8.totalLabel}
                </span>
                <span className="font-playfair text-xl">{formatInr(totalPrice)}</span>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 border-t border-ivory/20 pt-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
            {t.step8.includesLabel}
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/90">
            {t.step8.includes.join(" · ")}
          </p>
        </div>

        <div className="mt-6 border-t border-ivory/20 pt-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">
            {t.step8.notIncludedLabel}
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/90">
            {t.step8.notIncluded.join(" · ")}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Controller
          name="registrationIntent"
          control={control}
          render={({ field }) => (
            <PillGroup
              label={t.step8.proceedQuestion}
              options={localizeOptions(REGISTRATION_INTENT_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.registrationIntent?.message}
              columns={1}
            />
          )}
        />
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel={isReady ? t.step8.continueToPayment : t.step8.submitRegistration}
        nextDisabled={nextDisabled}
      />
    </div>
  );
}
