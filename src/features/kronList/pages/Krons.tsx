import VerticalNavigation from "@/features/home/components/VerticalNavigation"
import { useAllKronsHandler } from "../handlers/allKrons.Handlers";

import KronList from "../components/KronList";

function Update() {
const {krons} = useAllKronsHandler()

  return (
  <section className="flex md:p-8 bg-gradient-to-r from-blue-950 to-blue-100 h-full min-h-screen relative w-screen">
    <VerticalNavigation />
  
    <KronList searchArray={krons} />
  </section>
);
}

export default Update