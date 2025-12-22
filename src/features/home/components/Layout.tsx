import TopBar from "./TopBar";
import KronList from "./HomeKronList";
import ChartAndAnalysis from "../../analysis/components/ChartAndAnalysis";
import { useAllReposHandler } from "@/features/repositories/handlers/allRepo.Handlers";


function Layout() {
  const { repos } = useAllReposHandler();

  return (
    <section className="w-fit h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">
      <TopBar searchArray={repos}/>
      <KronList />
      <ChartAndAnalysis />
    </section>
  );
}

export default Layout;
