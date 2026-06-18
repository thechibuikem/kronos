import TopBar from "../../home/components/TopBar";
import RepoWrapper from "@/features/repos/components/RepoWrapper";
import { useAllReposHandler } from "@/features/repos/handlers/allRepo.Handlers";

function RepoList() {
  const { repos } = useAllReposHandler();

  return (
    <section className="w-full h-fit flex flex-col gap-y-7 px-4 md:px-10 py-7 max-w-[1100px]">
      <TopBar searchArray={repos} />
      <RepoWrapper />
    </section>
  );
}

export default RepoList;
