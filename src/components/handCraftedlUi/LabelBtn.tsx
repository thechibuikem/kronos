import { type IconType } from "react-icons/lib";
import { useNavigate, useLocation } from "react-router-dom";


interface LabelBtnProps {
  Logo: IconType
  name: string;
  logoWidth: string | number;
  textWidth: string | number;
  color:string
  to: string
}

function LabelBtn({ Logo, name, logoWidth, textWidth,color,to}: LabelBtnProps) {
  // determining the logo width
  const resolvedLogoWidth = typeof logoWidth === "number" ? `${logoWidth}rem` : logoWidth;
  // determining the text width
  const resolvedTextWidth = typeof textWidth === "number" ? `${textWidth}rem` : textWidth;

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  // function to handle click of our button
  function handleClickEvent() {
    navigate(to);
  }

  return (
    <button className={`py-2 px-4 gap-1 flex items-center justify-start rounded-sm cursor-pointer hover:scale-105 transition-all duration-500
+ ${isActive ? "bg-blue-950 border border-[#ffffff18] shadow-2xl shadow-[#ffffff18]" : "transparent"}`} onClick={handleClickEvent}>
      <Logo color={color} style={{ fontSize: resolvedLogoWidth }} />
      <h3 style={{ fontSize: resolvedTextWidth,color:color }}>{name}</h3>
    </button>
  );
}

export default LabelBtn