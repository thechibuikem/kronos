import VerticalNavigation from "@/features/home/components/VerticalNavigation";
import KronList from "../components/KronList";
import { useFetchKrons } from "@/hooks/useFetchKrons";

function Krons() {
  useFetchKrons();

  return (
    <section className="flex bg-[#0a0a0f] h-full min-h-screen relative w-screen">
      <VerticalNavigation />
      <KronList />
    </section>
  );
}

export default Krons;
