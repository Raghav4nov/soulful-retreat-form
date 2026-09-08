import type { LocalizedOption } from "@/schema/options";
import Pill from "./Pill";

type PillGroupProps = {
  label: string;
  options: LocalizedOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 1 | 2;
};

export function PillGroup({ label, options, value, onChange, error, columns = 2 }: PillGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-sans text-sm font-medium text-charcoal">{label}</span>
      <div className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
        {options.map((option) => (
          <Pill
            key={option.value}
            label={option.label}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

type PillMultiGroupProps = {
  label: string;
  options: LocalizedOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  columns?: 1 | 2;
};

export function PillMultiGroup({
  label,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: PillMultiGroupProps) {
  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="font-sans text-sm font-medium text-charcoal">{label}</span>
      <div className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
        {options.map((option) => (
          <Pill
            key={option.value}
            label={option.label}
            selected={value.includes(option.value)}
            onClick={() => toggle(option.value)}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
