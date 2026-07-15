import { LuLayoutDashboard, LuRefreshCcw } from "react-icons/lu";
import { ImCancelCircle } from "react-icons/im";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { LuGithub } from "react-icons/lu";
import { useContext } from "react";
import { AppContext } from "@/api/Context";
import LogOut from "../../auth/components/LogOut";
import KronosLogo from "./KronosLogo";
import LabelBtn from "./LabelBtn";

const VerticalNavigation = () => {
  const context = useContext(AppContext);
  if (!context) return "context cannot be used here";
  const { isNavOpen, setIsNavOpen } = context;

  const buttonMakers = [
    {
      name: "Dashboard",
      Logo: LuLayoutDashboard,
      logoWidth: "1.1rem",
      textWidth: "0.85rem",
      to: "/dashboard",
    },
    {
      name: "Krons",
      Logo: LuRefreshCcw,
      logoWidth: "1.1rem",
      textWidth: "0.85rem",
      to: "/krons",
    },
    {
      name: "Repos",
      Logo: LuGithub,
      logoWidth: "1.1rem",
      textWidth: "0.85rem",
      to: "/repos",
    },
  ];

  return (
    <figure
      className={`${
        isNavOpen ? "fixed flex" : "hidden"
      } min-h-full z-50 w-[20rem] md:w-[15rem] md:static md:flex flex-col gap-y-8 md:p-5 px-4 py-8
      bg-[#0d0d15] border-r border-[#1a1a2e]`}
    >
      {/* cancel bar btn + logo */}
      <div className="flex gap-x-4 items-center px-1">
        <button
          className={`${isNavOpen && "block"} md:hidden cursor-pointer text-[#64748b] hover:text-[#e2e8f0]`}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <ImCancelCircle size={"1.3rem"} />
        </button>
        <KronosLogo color="#e2e8f0" accentColor="#06b6d4" />
      </div>

      {/* nav links */}
      <section className="flex flex-col gap-y-1">
        {buttonMakers.map((btn, index) => (
          <LabelBtn
            key={index}
            Logo={btn.Logo}
            name={btn.name}
            logoWidth={btn.logoWidth}
            textWidth={btn.textWidth}
            to={btn.to}
          />
        ))}
      </section>

      {/* log out, pinned bottom */}
      <section className="fixed bottom-8 border-t border-[#1a1a2e] pt-4 w-[calc(15rem-2.5rem)]">
        <LogOut />
      </section>
    </figure>
  );
};

export default VerticalNavigation;
