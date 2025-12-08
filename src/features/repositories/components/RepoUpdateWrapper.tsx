import RepoUpdateCard from "@/features/repositories/components/RepoUpdateCard";
// import AddKronUpdateCard from "./AddKronUpdateCard";
import { useAllReposHandler } from "@/features/watchlist/handlers/allRepo.Handlers";

function KronUpdateWrapper() {
  const kronLimit: number = 30;
  // const KronList: kronType[] = [
  //   {
  //     name: "kronos",
  //     link: "https://www.google.com",
  //     desc: "lorem lorem lorem lorem ",
  //   },
  //   {
  //     name: "kronos",
  //     link: "https://www.google.com",
  //     desc: "lorem lorem lorem lorem ",
  //   },
  //   {
  //     name: "kronos",
  //     link: "https://www.google.com",
  //     desc: "lorem lorem lorem lorem lorem lorem lorem lorem",
  //   },
  //   {
  //     name: "kronos",
  //     link: "https://www.google.com",
  //     desc: "lorem lorem lorem lorem lorem lorem lorem lorem",
  //   },
  //   {
  //     name: "kronos",
  //     link: "https://www.google.com",
  //     desc: "lorem lorem lorem lorem",
  //   },
  // ];

  const { repos } = useAllReposHandler();

  return (
    <section className="bg-bue-500 w-full mt-8 gap-[2rem] flex flex-col px-4 md:px-8 mx-auto">
      <h1 className="text-3xl text-white">My Repositories</h1>

      {/* group of krons */}
      <figure className="w-full  gap-[1rem] flex flex-col">
        {repos.slice(0, kronLimit).map((repo, index) => (
          <RepoUpdateCard
            key={index}
            name={repo.repoName}
            link={repo.repoUrl}
          />
        ))}
      </figure>
    </section>
  );
}

export default KronUpdateWrapper;
