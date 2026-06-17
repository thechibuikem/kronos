interface KronosLogoProps {
  color?: string;
  accentColor?: string;
}

export default function KronosLogo({
  color = "#e2e8f0",
  accentColor = "#06b6d4",
}: KronosLogoProps) {
  return (
    <figure className="flex gap-x-2.5 justify-center items-center">
      <div
        className="flex items-center justify-center w-7 h-7 rounded-md border"
        style={{ borderColor: accentColor }}
      >
        <svg
          viewBox="0 0 16 16"
          width="13"
          height="13"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        >
          <circle cx="8" cy="8" r="3" />
          <line x1="8" y1="1" x2="8" y2="4" />
          <line x1="8" y1="12" x2="8" y2="15" />
          <line x1="1" y1="8" x2="4" y2="8" />
          <line x1="12" y1="8" x2="15" y2="8" />
        </svg>
      </div>
      <h1 className="text-lg font-semibold tracking-tight" style={{ color }}>
        Kron<span style={{ color: accentColor }}>os</span>
      </h1>
    </figure>
  );
}
