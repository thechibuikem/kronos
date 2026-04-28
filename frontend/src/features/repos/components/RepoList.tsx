import TopBar from "../../home/components/TopBar"
import RepoWrapper from "@/features/repositories/components/RepoWrapper";
import { useAllReposHandler } from "@/features/repositories/handlers/allRepo.Handlers"; 


//the main part in our respositories page 
function RepoList() {
  const { getRepos,repos } = useAllReposHandler(); //repos State from redux
  // getRepos()
  return (
  

    <section className="w-full h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">
      <TopBar searchArray={repos} />
      <RepoWrapper />
    </section>
  );
}

export default RepoList;