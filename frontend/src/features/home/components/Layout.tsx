import TopBar from "./TopBar";
import KronList from "./HomeKronList";
import StatusStrip from "./StatusStrip";
import { useAllKronsHandler } from "@/features/krons/handlers/allKrons.Handlers";


function Layout() {
  const { krons } = useAllKronsHandler();
  

  return (
    <section className="w-full h-fit flex flex-col gap-y-7 px-4 md:px-10 py-7 max-w-[1100px]">
      <TopBar searchArray={krons} />
      <StatusStrip/>
      <KronList kronArray={krons}/>
    </section>
  );
}

export default Layout;
