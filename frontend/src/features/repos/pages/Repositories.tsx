import VerticalNavigation from "@/features/home/components/VerticalNavigation";
import RepoList from "@/features/repos/components/RepoList";
import { useFetchRepos } from "@/hooks/useFetchRepos";

function Repos() {
  useFetchRepos();

  return (
    <section className="flex bg-[#0a0a0f] h-full min-h-screen relative w-screen">
      <VerticalNavigation />
      <RepoList />
    </section>
  );
}

export default Repos;
