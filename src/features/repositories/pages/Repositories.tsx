import VerticalNavigation from "@/features/home/components/VerticalNavigation";
import RepoList from "@/features/repositories/components/RepoList";
import { type Repo } from "@/features/watchlist/slices/allRepo.Slice";
import { useAllReposHandler } from "@/features/watchlist/handlers/allRepo.Handlers";

interface RepoListProps {
  searchArray: Repo[];
}


//=========My repositories list ===========//
function Repositories({ searchArray }: RepoListProps) {
const {repos} = useAllReposHandler()

  return (
    <section className="flex md:p-8 bg-gradient-to-r from-blue-950 to-blue-100 h-full min-h-screen relative w-screen">
      <VerticalNavigation />
      <RepoList searchArray={repos} />
    </section>
  );
}

export default Repositories;
