import TopBar from "../../home/components/TopBar";
import KronWrapper from "./KronWrapper";
import { useAllKronsHandler } from "../handlers/allKrons.Handlers";
import type { Repo } from "@/features/repos/slices/allRepo.Slice";
 
function KronList() {
  const { krons } = useAllKronsHandler();
 
  return (
    <section className="w-full h-fit flex flex-col gap-y-7 px-4 md:px-10 py-7 max-w-[1100px]">
      <TopBar searchArray={krons as Repo[]} />
      <KronWrapper />
    </section>
  );
}
 
export default KronList;
 