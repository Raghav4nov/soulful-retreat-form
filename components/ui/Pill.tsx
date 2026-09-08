type PillProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function Pill({ label, selected, onClick }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-5 py-3 text-left font-sans text-sm font-medium transition-colors duration-200 sm:text-base ${
        selected
          ? "border-forest bg-forest text-ivory"
          : "border-sage/70 bg-transparent text-charcoal hover:border-forest"
      }`}
    >
      {label}
    </button>
  );
}
