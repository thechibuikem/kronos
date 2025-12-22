import Introtext from "./Introtext";
import SearchComponent from "./SearchComponent";
import { type Repo } from "@/features/repositories/slices/allRepo.Slice";
// import { useAllReposHandler } from "@/features/watchlist/handlers/allRepo.Handlers";


interface TopBarProps{
  searchArray:Repo[]
}







function TopBar({searchArray}: TopBarProps) {
  // const {repos}= useAllReposHandler()
  return (
    <section className="flex flex-col gap-y-8 pt-8 lg:flex-row md:items-center justify-between">
      <Introtext />
      <SearchComponent searchArray={searchArray} />
    </section>
  );
}

export default TopBar