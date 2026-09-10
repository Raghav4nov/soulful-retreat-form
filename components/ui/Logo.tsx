type LogoProps = {
  className?: string;
  markSize?: number;
  showWordmark?: boolean;
};

export default function Logo({ className = "", markSize = 40, showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="shrink-0 text-forest"
      >
        <g transform="rotate(0 60 60)">
          <ellipse cx="60" cy="37" rx="9" ry="24" />
        </g>
        <g transform="rotate(60 60 60)">
          <ellipse cx="60" cy="37" rx="9" ry="24" />
        </g>
        <g transform="rotate(120 60 60)">
          <ellipse cx="60" cy="37" rx="9" ry="24" />
        </g>
        <g transform="rotate(180 60 60)">
          <ellipse cx="60" cy="37" rx="9" ry="24" />
        </g>
        <g transform="rotate(240 60 60)">
          <ellipse cx="60" cy="37" rx="9" ry="24" />
        </g>
        <g transform="rotate(300 60 60)">
          <ellipse cx="60" cy="37" rx="9" ry="24" />
        </g>
        <circle cx="60" cy="60" r="6" />
      </svg>
      {showWordmark && (
        <span className="font-playfair text-lg leading-none font-semibold text-forest sm:text-xl">
          Soulful Healing Adventure
        </span>
      )}
    </div>
  );
}
