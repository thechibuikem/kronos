import TopBar from "../../home/components/TopBar"
import KronUpdateWrapper from "./KronUpdateWrapper";
import { useAllKronsHandler } from "../handlers/allKrons.Handlers";
import type { Kron } from "../slices/allKron.Slice";


interface KronListProps {
  searchArray: Kron[];
}




function KronList({ searchArray }: KronListProps) {
  const { krons } = useAllKronsHandler(); //repos State from redux
  return (
    //

    <section className="w-full h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">
      <TopBar searchArray={krons} />
      <KronUpdateWrapper />
    </section>
  );
}

export default KronList;