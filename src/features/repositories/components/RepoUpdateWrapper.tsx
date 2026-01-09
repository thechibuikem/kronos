import RepoCard from "@/features/repositories/components/RepoCard";
import { Loader } from "@/features/loading/components/preloader";
// import AddKronUpdateCard from "./AddKronUpdateCard";
import { useAllReposHandler } from "@/features/repositories/handlers/allRepo.Handlers";

function KronUpdateWrapper() {
  // const kronLimit: number = 30;
  const { repos } = useAllReposHandler();//repos State from redux

  return (
    <section className="bg-bue-500 w-full mt-8 gap-[2rem] flex flex-col px-4 md:px-8 mx-auto">
      <h1 className="text-3xl text-white">My Repositories</h1>

      {/* group of krons */}
      <figure className="w-full  gap-[1rem] flex flex-col">
        {repos.length === 0 && (
          <div className="w-full my-24 flex justify-center ">
            <Loader size={50}/>
          </div>
        )}

        {/* {repos.slice(0, kronLimit).map((repo, index) => ( */}
        {repos.map((repo, index) => (
          <RepoCard
            key={index}
            repoName={repo.repoName}
            repoUrl={repo.repoUrl}
            githubOwnerId={repo.githubOwnerId}
            repoId={repo.repoId}
            isPrivate={repo.isPrivate}
          />
        ))}
      </figure>
    </section>
  );
}

export default KronUpdateWrapper;
