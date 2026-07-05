import { useState } from "react";
import RepoCard from "@/features/repos/components/RepoCard";
import { Loader } from "@/features/loading/components/preloader";
import { useAllReposHandler } from "@/features/repos/handlers/allRepo.Handlers";
import { LuChevronDown } from "react-icons/lu";

const PAGE_SIZE = 10;

function RepoWrapper() {
  const { repos } = useAllReposHandler();
  console.log(repos)
  const [visible, setVisible] = useState<number>(PAGE_SIZE);
  
  const visibleRepos = repos.slice(0, visible);
  const hasMore = visible < repos.length;

  function loadMore() {
    setVisible((prev) => prev + PAGE_SIZE);
  }

  return (
    <section className="w-full flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
          My Repositories
        </h2>
        <span className="text-xs text-[#334155] bg-[#111118] border border-[#1e293b] rounded-full px-3 py-0.5">
          {repos.length} repos
        </span>
      </div>

      <div className="flex flex-col gap-y-2.5">
        {repos.length === 0 ? (
          <div className="w-full flex justify-center py-24">
            <Loader size={40} />
          </div>
        ) : (
          <>
            {visibleRepos.map((repo, index) => (
              <RepoCard
                key={index}
                repoName={repo.repoName}
                repoUrl={repo.repoUrl}
                githubOwnerId={repo.githubOwnerId}
                repoId={repo.repoId}
                isPrivate={repo.isPrivate}
                owner={repo.owner}
              />
            ))}

            {hasMore && (
              <button
                onClick={loadMore}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 mt-1
                  rounded-xl border border-[#1e293b] bg-[#111118]
                  text-sm font-medium text-[#64748b]
                  hover:text-[#e2e8f0] hover:border-[#334155]
                  transition-all duration-150 cursor-pointer"
              >
                <LuChevronDown size={15} />
                Load more
                <span className="text-xs text-[#334155] ml-1">
                  ({repos.length - visible} remaining)
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default RepoWrapper;
