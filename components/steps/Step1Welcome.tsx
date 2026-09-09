import { useLanguage } from "@/i18n/LanguageContext";

type Step1WelcomeProps = {
  onNext: () => void;
};

export default function Step1Welcome({ onNext }: Step1WelcomeProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage-deep">
        {t.brand.badge}
      </p>
      <h1 className="font-playfair mt-4 text-3xl leading-tight text-forest sm:text-4xl">
        {t.brand.name}
      </h1>
      <p className="font-cormorant mt-4 text-xl italic text-charcoal/80 sm:text-2xl">
        {t.step1.tagline}
      </p>
      <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-charcoal/70 sm:text-base">
        {t.step1.description}
      </p>
      <button
        type="button"
        onClick={onNext}
        className="mt-10 rounded-full bg-forest px-10 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {t.step1.cta}
      </button>
    </div>
  );
}
