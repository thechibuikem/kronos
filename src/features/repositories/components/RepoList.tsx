import TopBar from "../../home/components/TopBar"
import RepoUpdateWrapper from "@/features/repositories/components/RepoUpdateWrapper";
import { useAllReposHandler } from "@/features/repositories/handlers/allRepo.Handlers"; 


//the main part in our respositories page 
function RepoList() {
  const { repos } = useAllReposHandler(); //repos State from redux
  return (
    //

    <section className="w-full h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">
      <TopBar searchArray={repos} />
      <RepoUpdateWrapper />
    </section>
  );
}

export default RepoList;