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
          className="flex items-center gap-2 font-sans text-sm font-medium text-charcoal/70 transition-colors hover:text-forest"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="M11 18L5 12L11 6" />
          </svg>
          Back
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
