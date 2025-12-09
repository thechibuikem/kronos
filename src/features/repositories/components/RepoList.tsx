import TopBar from "../../home/components/TopBar"
import RepoUpdateWrapper from "@/features/repositories/components/RepoUpdateWrapper";
import { useAllReposHandler} from "@/features/watchlist/handlers/allRepo.Handlers"; 
import type { Repo } from "@/features/watchlist/slices/allRepo.Slice";


interface RepoListProps {
  searchArray: Repo[];
}




function RepoList({ searchArray }: RepoListProps) {
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