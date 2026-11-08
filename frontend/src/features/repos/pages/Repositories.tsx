import { useState } from "react";
import VerticalNavigation from "@/features/home/components/VerticalNavigation";
import RepoList from "@/features/repos/components/RepoList";
import { useFetchRepos } from "@/hooks/useFetchRepos";
import { useAllReposHandler } from "@/features/repos/handlers/allRepo.Handlers";
import type { SearchableItem } from "@/features/home/utilis/searchTargets";

const PAGE_SIZE = 10;

function Repos() {
  useFetchRepos();
  const { repos } = useAllReposHandler();
  const [visible, setVisible] = useState(PAGE_SIZE);

  function revealSearchResult(item: SearchableItem) {
    const index = repos.findIndex((repo) => repo.repoId === item.repoId);
    if (index >= 0) {
      setVisible((current) => Math.max(current, index + 1));
    }
  }

  return (
    <section className="flex bg-[#0a0a0f] h-full min-h-screen relative w-screen">
      <VerticalNavigation />
      <RepoList
        visible={visible}
        onLoadMore={() => setVisible((current) => current + PAGE_SIZE)}
        onSearchResultSelect={revealSearchResult}
      />
    </section>
  );
}

export default Repos;
