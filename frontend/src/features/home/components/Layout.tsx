import TopBar from "./TopBar";
import KronList from "./HomeKronList";
import StatusStrip from "./StatusStrip";
import { useAllReposHandler } from "@/features/repos/handlers/allRepo.Handlers";

function Layout() {
  const { repos } = useAllReposHandler();

  return (
    <section className="w-full h-fit flex flex-col gap-y-7 px-4 md:px-10 py-7 max-w-[1100px]">
      <TopBar searchArray={repos} />
      <StatusStrip />
      <KronList />
    </section>
  );
}

export default Layout;
