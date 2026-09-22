type StatCardProps = {
  label: string;
  value: number;
  highlight?: boolean;
};

export default function StatCard({ label, value, highlight = false }: StatCardProps) {
  return (
    <div
      className={
        highlight
          ? "rounded-2xl bg-forest p-6 text-ivory"
          : "rounded-2xl border border-sage/30 bg-white p-6 text-charcoal"
      }
    >
      <p
        className={
          highlight
            ? "font-sans text-xs font-semibold uppercase tracking-wide text-ivory/70"
            : "font-sans text-xs font-semibold uppercase tracking-wide text-charcoal/50"
        }
      >
        {label}
      </p>
      <p className="font-playfair mt-3 text-4xl">{value}</p>
    </div>
  );
}
