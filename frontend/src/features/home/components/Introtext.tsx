import { useContext } from "react";
import { AppContext } from "@/api/Context";
import { RxHamburgerMenu } from "react-icons/rx";

function Introtext() {
  const context = useContext(AppContext);
  if (!context) return "context cannot be used here";
  const { isNavOpen, setIsNavOpen } = context;

  return (
    <section className="flex items-center gap-x-4">
      <button
        className="md:hidden cursor-pointer text-[#64748b] hover:text-[#e2e8f0]"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <RxHamburgerMenu size="1.4rem" />
      </button>

      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-semibold tracking-tight text-[#e2e8f0]">
          Dashboard
        </h1>
        <p className="text-[13px] text-[#64748b]">Tracking your active Krons</p>
      </div>
    </section>
  );
}

export default Introtext;
