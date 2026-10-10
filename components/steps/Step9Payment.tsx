"use client";

import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { QRCodeSVG } from "qrcode.react";
import type { FormValues } from "@/schema/formSchema";
import { TextField } from "@/components/ui/TextField";
import { StepHeading, StepIntro } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";
import { formatInr, getTotalPrice } from "@/lib/pricing";
import { GenericUpiIcon, GooglePayIcon, PaytmIcon, PhonePeIcon } from "@/components/ui/paymentIcons";

// Receiving UPI ID for retreat payments — update here if it ever changes.
// The amount is computed from the selected accommodation (lib/pricing.ts),
// not hardcoded, so it always matches what Step 8 showed.
const UPI_VPA = "parmanandpriyanka@ybl";
const UPI_PAYEE_NAME = "Soulful Healing Adventure";
const UPI_NOTE = "Soulful Healing Adventure Registration";

function buildUpiLink(schemeAndPath: string, amount: number): string {
  const params = new URLSearchParams({
    pa: UPI_VPA,
    pn: UPI_PAYEE_NAME,
    am: String(amount),
    cu: "INR",
    tn: UPI_NOTE,
  });
  return `${schemeAndPath}?${params.toString()}`;
}

type Step9PaymentProps = {
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
};

export default function Step9Payment({ onNext, onBack, nextDisabled }: Step9PaymentProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const totalPrice = getTotalPrice(watch("deluxeRoomUpgrade"));

  const upiLinks = useMemo(
    () => ({
      generic: buildUpiLink("upi://pay", totalPrice),
      // Google Pay's registered deep-link path is "tez://upi/pay" - the
      // extra "/upi/" segment matters, unlike PhonePe/Paytm below. Without
      // it Android has no app registered for the link and the tap does
      // nothing.
      gpay: buildUpiLink("tez://upi/pay", totalPrice),
      phonePe: buildUpiLink("phonepe://pay", totalPrice),
      paytm: buildUpiLink("paytmmp://pay", totalPrice),
    }),
    [totalPrice]
  );

  async function handleCopyUpiId() {
    try {
      await navigator.clipboard.writeText(UPI_VPA);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail (older browsers, denied permission) —
      // the UPI ID is still shown as plain text for manual copying.
    }
  }

  return (
    <div>
      <StepHeading>{t.step9.heading}</StepHeading>
      <StepIntro>{t.step9.intro}</StepIntro>

      <div className="mt-8 rounded-3xl border border-sage/40 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            {t.step9.amountLabel}
          </p>
          <p className="font-playfair text-3xl text-forest">{formatInr(totalPrice)}</p>
        </div>

        <div className="mx-auto mt-6 flex w-fit items-center justify-center rounded-2xl border border-sage/40 bg-ivory p-4">
          <QRCodeSVG value={upiLinks.generic} size={160} fgColor="#174D3B" />
        </div>
        <p className="mt-3 text-center font-sans text-xs text-charcoal/60">{t.step9.scanQrLabel}</p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="text-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              {t.step9.upiLabel}
            </p>
            <p className="font-playfair mt-1 text-lg text-forest">{UPI_VPA}</p>
          </div>
          <button
            type="button"
            onClick={handleCopyUpiId}
            className="rounded-full border border-sage/50 px-4 py-2 font-sans text-xs font-semibold text-forest hover:bg-sage/10"
          >
            {copied ? t.step9.copiedLabel : t.step9.copyUpiId}
          </button>
        </div>

        <div className="mt-6 border-t border-sage/20 pt-6 sm:hidden">
          <p className="text-center font-sans text-xs text-charcoal/60">{t.step9.payWithLabel}</p>
          <div className="mt-3 flex flex-col gap-3">
            <a
              href={upiLinks.gpay}
              className="flex items-center justify-center gap-2 rounded-full border border-sage/50 bg-white px-5 py-3 font-sans text-sm font-semibold text-charcoal"
            >
              <GooglePayIcon />
              {t.step9.payGpay}
            </a>
            <a
              href={upiLinks.phonePe}
              className="flex items-center justify-center gap-2 rounded-full bg-[#5f259f] px-5 py-3 font-sans text-sm font-semibold text-white"
            >
              <PhonePeIcon />
              {t.step9.payPhonePe}
            </a>
            <a
              href={upiLinks.paytm}
              className="flex items-center justify-center gap-2 rounded-full bg-[#00baf2] px-5 py-3 font-sans text-sm font-semibold text-white"
            >
              <PaytmIcon />
              {t.step9.payPaytm}
            </a>
            <a
              href={upiLinks.generic}
              className="flex items-center justify-center gap-2 rounded-full border border-forest/40 px-5 py-3 font-sans text-sm font-semibold text-forest"
            >
              <GenericUpiIcon />
              {t.step9.payAnyApp}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <p className="font-sans text-sm text-charcoal/70">{t.step9.alreadyPaidLabel}</p>
        <TextField
          label={t.step9.utrLabel}
          placeholder={t.step9.utrPlaceholder}
          registration={register("utrNumber")}
          error={errors.utrNumber?.message}
          inputMode="numeric"
          maxLength={12}
        />

        <label className="flex items-start gap-3 font-sans text-sm text-charcoal">
          <input
            type="checkbox"
            {...register("policyAgreement")}
            className="mt-1 h-4 w-4 rounded border-sage accent-forest focus:ring-forest/40"
          />
          <span>{t.step9.agreementLabel}</span>
        </label>
        {errors.policyAgreement?.message && (
          <p className="-mt-4 text-sm text-red-600">{errors.policyAgreement.message}</p>
        )}
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel={t.step9.registerButton}
        nextDisabled={nextDisabled}
      />
    </div>
  );
}
