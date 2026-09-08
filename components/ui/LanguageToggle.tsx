import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/types";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "hi", label: "हिं" },
];

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Select language"
      className="inline-flex overflow-hidden rounded-full border border-sage/50 font-sans text-xs font-semibold"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          aria-pressed={locale === option.value}
          className={`px-3 py-1.5 transition-colors ${
            locale === option.value
              ? "bg-forest text-ivory"
              : "text-charcoal/60 hover:text-forest"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
