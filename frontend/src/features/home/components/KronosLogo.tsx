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
      <h1 className="text-lg font-semibold tracking-tight" style={{ color }}>
        Kron<span style={{ color: accentColor }}>os</span>
      </h1>
    </figure>
  );
}
