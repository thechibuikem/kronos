import { type Repo } from "@/features/repos/slices/allRepo.Slice";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export interface repoItem {
  id: number;
  name: string;
}

interface SearchComponentsProps {
  searchArray: Repo[];
}

function SearchComponent({ searchArray }: SearchComponentsProps) {
  return (
    <section className="relative w-full lg:w-[320px] gap-y-2">
      <SearchBar />
      <SearchResults repos={searchArray} />
    </section>
  );
}

export default SearchComponent;
