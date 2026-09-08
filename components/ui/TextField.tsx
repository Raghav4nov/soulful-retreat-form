import type { UseFormRegisterReturn } from "react-hook-form";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  optional?: boolean;
};

export function TextField({
  label,
  placeholder,
  registration,
  error,
  type = "text",
  optional,
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={registration.name} className="font-sans text-sm font-medium text-charcoal">
        {label}
        {optional && <span className="font-normal text-sage"> (optional)</span>}
      </label>
      <input
        id={registration.name}
        type={type}
        placeholder={placeholder}
        {...registration}
        className="w-full rounded-2xl border border-sage/70 bg-transparent px-4 py-3 font-sans text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

type TextAreaFieldProps = Omit<TextFieldProps, "type"> & { rows?: number };

export function TextAreaField({
  label,
  placeholder,
  registration,
  error,
  optional,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={registration.name} className="font-sans text-sm font-medium text-charcoal">
        {label}
        {optional && <span className="font-normal text-sage"> (optional)</span>}
      </label>
      <textarea
        id={registration.name}
        rows={rows}
        placeholder={placeholder}
        {...registration}
        className="w-full resize-none rounded-2xl border border-sage/70 bg-transparent px-4 py-3 font-sans text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
