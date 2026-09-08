type StepNavProps = {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  showBack?: boolean;
};

export function StepNav({ onBack, onNext, nextLabel = "Continue", showBack = true }: StepNavProps) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="font-sans text-sm font-medium text-charcoal/70 transition-colors hover:text-forest"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        className="rounded-full bg-forest px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {nextLabel}
      </button>
    </div>
  );
}
