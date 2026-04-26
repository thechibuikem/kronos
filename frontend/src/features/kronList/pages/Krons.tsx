import VerticalNavigation from "@/features/home/components/VerticalNavigation"
import KronList from "../components/KronList";
import { useFetchKrons } from "@/hooks/useFetchKrons";


function Krons() {
useFetchKrons()  

  return (
    <section className="flex md:p-8 bg-gradient-to-r from-blue-950 to-blue-100 h-full min-h-screen relative w-screen">
      <VerticalNavigation />
      <KronList />
    </section>
  );
}

export default Krons