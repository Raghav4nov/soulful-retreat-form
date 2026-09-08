import { useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import { TextField } from "@/components/ui/TextField";
import { StepHeading, StepIntro } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";

type Step9PaymentProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step9Payment({ onNext, onBack }: Step9PaymentProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <StepHeading>Complete Your Registration</StepHeading>
      <StepIntro>Your journey is almost ready to begin.</StepIntro>

      <div className="mt-8 rounded-3xl border border-sage/40 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Registration Amount
            </p>
            <p className="font-playfair mt-1 text-xl text-forest">₹____</p>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              UPI ID
            </p>
            <p className="font-playfair mt-1 text-xl text-forest">_____</p>
          </div>
        </div>

        <div className="mx-auto mt-6 flex h-40 w-40 items-center justify-center rounded-2xl border border-dashed border-sage/60 bg-ivory">
          <span className="font-sans text-xs uppercase tracking-wide text-sage">
            QR Code
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <TextField
          label="Transaction / UTR Number"
          placeholder="Enter the transaction reference"
          registration={register("utrNumber")}
          error={errors.utrNumber?.message}
        />

        <label className="flex items-start gap-3 font-sans text-sm text-charcoal">
          <input
            type="checkbox"
            {...register("policyAgreement")}
            className="mt-1 h-4 w-4 rounded border-sage text-forest focus:ring-forest/40"
          />
          <span>
            I confirm my details are accurate and agree to the retreat policies.
          </span>
        </label>
        {errors.policyAgreement?.message && (
          <p className="-mt-4 text-sm text-red-600">{errors.policyAgreement.message}</p>
        )}
      </div>

      <StepNav onBack={onBack} onNext={onNext} nextLabel="Register For The Journey →" />
    </div>
  );
}
