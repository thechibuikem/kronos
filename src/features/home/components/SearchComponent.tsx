import type { Repo } from "@/features/watchlist/slices/allRepo.Slice"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

export interface repoItem{
  id:number
  name:string,
}

// Props for my search component
interface SearchComponentsProps {
  searchArray: Repo[];
}

// search component consisting search bar and results
function SearchComponent({ searchArray }: SearchComponentsProps) {
  return (
    <section className="relative md:w-[40rem] gap-y-2 px-4 md:px-8">
      <SearchBar />
      <SearchResults repos={searchArray} />
    </section>
  );
}

export default SearchComponent