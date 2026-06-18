import RepoCard from "@/features/repos/components/RepoCard";
import { Loader } from "@/features/loading/components/preloader";
import { useAllReposHandler } from "@/features/repos/handlers/allRepo.Handlers";

function RepoWrapper() {
  const { repos } = useAllReposHandler();

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
          repos.map((repo, index) => (
            <RepoCard
              key={index}
              repoName={repo.repoName}
              repoUrl={repo.repoUrl}
              githubOwnerId={repo.githubOwnerId}
              repoId={repo.repoId}
              isPrivate={repo.isPrivate}
              owner={repo.owner}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default RepoWrapper;
