"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { QRCodeSVG } from "qrcode.react";
import type { FormValues } from "@/schema/formSchema";
import { TextField } from "@/components/ui/TextField";
import { StepHeading, StepIntro } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";

// Receiving UPI ID for retreat payments. Update here (and the matching
// amount below, which must stay in sync with step8.investmentValue /
// step9.amountLabel in i18n/translations.ts) if either ever changes.
const UPI_VPA = "parmanandpriyanka@ybl";
const UPI_PAYEE_NAME = "Soulful Healing Adventure";
const UPI_AMOUNT = "10000";
const UPI_NOTE = "Soulful Healing Adventure Registration";

function buildUpiLink(scheme: string): string {
  const params = new URLSearchParams({
    pa: UPI_VPA,
    pn: UPI_PAYEE_NAME,
    am: UPI_AMOUNT,
    cu: "INR",
    tn: UPI_NOTE,
  });
  return `${scheme}://pay?${params.toString()}`;
}

// The generic "upi://" link is what the QR code encodes, since a camera
// scan has no app context — the phone's own UPI app handles it. The
// app-specific schemes below are what let a button deep-link straight
// into that one app on a phone that already has it installed.
const GENERIC_UPI_LINK = buildUpiLink("upi");
const GPAY_LINK = buildUpiLink("tez");
const PHONEPE_LINK = buildUpiLink("phonepe");
const PAYTM_LINK = buildUpiLink("paytmmp");

type Step9PaymentProps = {
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
};

export default function Step9Payment({ onNext, onBack, nextDisabled }: Step9PaymentProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

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
          <p className="font-playfair text-3xl text-forest">{t.step8.investmentValue}</p>
        </div>

        <div className="mx-auto mt-6 flex w-fit items-center justify-center rounded-2xl border border-sage/40 bg-ivory p-4">
          <QRCodeSVG value={GENERIC_UPI_LINK} size={160} fgColor="#174D3B" />
        </div>
        <p className="mt-3 text-center font-sans text-xs text-charcoal/60">{t.step9.scanQrLabel}</p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <div>
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
              href={GPAY_LINK}
              className="rounded-full border border-sage/50 bg-white px-5 py-3 text-center font-sans text-sm font-semibold text-charcoal"
            >
              {t.step9.payGpay}
            </a>
            <a
              href={PHONEPE_LINK}
              className="rounded-full bg-[#5f259f] px-5 py-3 text-center font-sans text-sm font-semibold text-white"
            >
              {t.step9.payPhonePe}
            </a>
            <a
              href={PAYTM_LINK}
              className="rounded-full bg-[#00baf2] px-5 py-3 text-center font-sans text-sm font-semibold text-white"
            >
              {t.step9.payPaytm}
            </a>
            <a
              href={GENERIC_UPI_LINK}
              className="rounded-full border border-forest/40 px-5 py-3 text-center font-sans text-sm font-semibold text-forest"
            >
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
        />

        <label className="flex items-start gap-3 font-sans text-sm text-charcoal">
          <input
            type="checkbox"
            {...register("policyAgreement")}
            className="mt-1 h-4 w-4 rounded border-sage text-forest focus:ring-forest/40"
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
