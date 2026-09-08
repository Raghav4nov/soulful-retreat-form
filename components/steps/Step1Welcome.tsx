type Step1WelcomeProps = {
  onNext: () => void;
};

export default function Step1Welcome({ onNext }: Step1WelcomeProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage">
        Rishikesh · 14–15 November 2026
      </p>
      <h1 className="font-playfair mt-4 text-3xl leading-tight text-forest sm:text-4xl">
        Soulful Healing Adventure
      </h1>
      <p className="font-cormorant mt-4 text-xl italic text-charcoal/80 sm:text-2xl">
        Same you. But a kinder, calmer, brighter version.
      </p>
      <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-charcoal/70 sm:text-base">
        A short registration to help our team understand you, and make sure your
        time with us feels exactly right. It takes about five minutes.
      </p>
      <button
        type="button"
        onClick={onNext}
        className="mt-10 rounded-full bg-forest px-10 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Begin Registration
      </button>
    </div>
  );
}
