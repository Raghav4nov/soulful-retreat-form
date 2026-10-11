import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "@/schema/formSchema";
import {
  YES_NO_OPTIONS,
  TRAVEL_MODE_OPTIONS,
  TRAVEL_GUIDANCE_OPTIONS,
  ACCOMMODATION_OPTIONS,
  localizeOptions,
} from "@/schema/options";
import { PillGroup } from "@/components/ui/PillGroup";
import { TextField } from "@/components/ui/TextField";
import { StepHeading } from "@/components/ui/StepHeading";
import { StepNav } from "@/components/ui/StepNav";
import { useLanguage } from "@/i18n/LanguageContext";
import { ACCOMMODATION_PRICES, formatInr } from "@/lib/pricing";

type Step5TravelProps = {
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
};

export default function Step5Travel({ onNext, onBack, nextDisabled }: Step5TravelProps) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t, locale } = useLanguage();

  const travellingFromOutside = watch("travellingFromOutside");

  return (
    <div>
      <StepHeading>{t.step5.heading}</StepHeading>
      <div className="mt-8 flex flex-col gap-8">
        <Controller
          name="travellingFromOutside"
          control={control}
          render={({ field }) => (
            <PillGroup
              label={t.step5.travellingFromOutsideQuestion}
              options={localizeOptions(YES_NO_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.travellingFromOutside?.message}
            />
          )}
        />

        {travellingFromOutside === "yes" && (
          <>
            <Controller
              name="travelMode"
              control={control}
              render={({ field }) => (
                <PillGroup
                  label={t.step5.travelModeQuestion}
                  options={localizeOptions(TRAVEL_MODE_OPTIONS, locale)}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.travelMode?.message}
                />
              )}
            />
            <Controller
              name="travelGuidance"
              control={control}
              render={({ field }) => (
                <PillGroup
                  label={t.step5.travelGuidanceQuestion}
                  options={localizeOptions(TRAVEL_GUIDANCE_OPTIONS, locale)}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.travelGuidance?.message}
                />
              )}
            />
          </>
        )}

        <Controller
          name="accommodationPreference"
          control={control}
          render={({ field }) => (
            <PillGroup
              label={t.step5.accommodationLabel}
              options={localizeOptions(ACCOMMODATION_OPTIONS, locale)}
              value={field.value}
              onChange={field.onChange}
              error={errors.accommodationPreference?.message}
            />
          )}
        />

        <div className="-mt-4 flex flex-col gap-1.5 rounded-2xl bg-sage/10 p-4">
          <p className="font-sans text-xs text-charcoal/60">{t.step5.accommodationPriceNote}</p>
          {localizeOptions(ACCOMMODATION_OPTIONS, locale).map((option) => (
            <div key={option.value} className="flex items-center justify-between font-sans text-sm">
              {/* "(meal included)" is already said once in the note above - drop
                  it here so the room-type name doesn't wrap onto a second line. */}
              <span className="text-charcoal">{option.label.replace(/\s*\(.*\)$/, "")}</span>
              <span className="font-semibold text-forest">{formatInr(ACCOMMODATION_PRICES[option.value])}</span>
            </div>
          ))}
        </div>

        <TextField
          label={t.step5.companionLabel}
          placeholder={t.step5.companionPlaceholder}
          registration={register("companionName")}
          optional
        />
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextDisabled={nextDisabled} />
    </div>
  );
}
