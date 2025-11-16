import { LuAlarmClockMinus } from "react-icons/lu";

// Define the default color outside the component for clarity
const DEFAULT_COLOR = "#ecececbd";

interface KronosLogoProps {
  color?: string; // The '?' marks the prop as optional
}

export default function KronosLogo( {color}:KronosLogoProps ) {
  // Use the color prop if it's provided, otherwise use the default
  const currentColor = color || DEFAULT_COLOR;

  return (
    <figure className="flex gap-x-2 justify-center items-center">
      <LuAlarmClockMinus style={{ color: currentColor, fontSize: "2rem" }} />
      {/* Apply the color to the text using an inline style or dynamic Tailwind class if available */}
      <h1 className="text-3xl uppercase" style={{ color: currentColor }}>
        kronos
      </h1>
    </figure>
  );
}
