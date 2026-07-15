import { type IconType } from "react-icons/lib";
import { useNavigate, useLocation } from "react-router-dom";

interface LabelBtnProps {
  Logo: IconType;
  name: string;
  logoWidth: string | number;
  textWidth: string | number;
  to: string;
}

function LabelBtn({ Logo, name, logoWidth, textWidth, to }: LabelBtnProps) {
  const resolvedLogoWidth =
    typeof logoWidth === "number" ? `${logoWidth}rem` : logoWidth;
  const resolvedTextWidth =
    typeof textWidth === "number" ? `${textWidth}rem` : textWidth;

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  function handleClickEvent() {
    navigate(to);
  }

  return (
    <button
      className={`py-2.5 px-3 gap-3 flex items-center justify-start rounded-lg cursor-pointer
        transition-all duration-150 border
        ${
          isActive
            ? "bg-[#111118] border-[#1e293b] text-[#e2e8f0]"
            : "border-transparent text-[#64748b] hover:text-[#94a3b8] hover:bg-[#0d0d15]"
        }`}
      onClick={handleClickEvent}
    >
      <Logo
        style={{
          fontSize: resolvedLogoWidth,
          color: isActive ? "#06b6d4" : "currentColor",
        }}
      />
      <h3 style={{ fontSize: resolvedTextWidth }} className="font-medium">
        {name}
      </h3>
    </button>
  );
}

export default LabelBtn;
