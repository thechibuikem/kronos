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
  // creating context branch
  const context = useContext(AppContext);
  // guard to check if context is okay
  if (!context) return "context cannot be used here";
  // destructuring what I need from context
  const { isNavOpen, setIsNavOpen } = context;

  const buttonMakers = [
    {
      name: "Dashboard",
      Logo: LuLayoutDashboard,
      logoWidth: 1,
      textWidth: 1,
      color: "#ecececbd",
      to: "/dashboard",
    },
    {
      name: "Update Krons",
      Logo: LuRefreshCcw,
      logoWidth: 1,
      textWidth: 1,
      color: "#ecececbd",
      to: "/update",
    },
    {
      name: "Repositories",
      Logo: LuGithub,
      logoWidth: 1,
      textWidth: 1,
      color: "#ecececbd",
      to: "/repositories",
    },
    {
      name: "Analytics",
      Logo: TbBrandGoogleAnalytics,
      logoWidth: 1,
      textWidth: 1,
      color: "#ecececbd",
      to: "/analytics",
    },
  ];

  return (
    <figure
      className={`${
        isNavOpen ? "fixed flex" : "hidden"
      } min-h-full z-50 w-[20rem] md:w-[15rem] md:static md:flex flex-col gap-y-[2rem] md:p-[2rem] px-[1rem] py-[2rem] transparent-cards`}
    >
      {/* cancel bar btn + logo */}
      <div className="flex gap-x-4 items-center">
        <button
          className={`${isNavOpen && "block"} md:hidden cursor-pointer`}
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        >
          <ImCancelCircle size={"1.5rem"} className="hover:text-blue-950" />
        </button>

        <KronosLogo />
      </div>
      {/* other navBar settings */}
      <section className="flex flex-col gap-y-[1rem]">
        {buttonMakers.map((btn, index) => (
          <LabelBtn
            key={index}
            Logo={btn.Logo}
            name={btn.name}
            logoWidth={btn.logoWidth}
            textWidth={btn.textWidth}
            color={btn.color}
            to={btn.to}
          />
        ))}
      </section>
      {/* ending section */}
      <section className="fixed bottom-[2rem]">
        <LogOut />
      </section>
    </figure>
  );
};

export default VerticalNavigation;
