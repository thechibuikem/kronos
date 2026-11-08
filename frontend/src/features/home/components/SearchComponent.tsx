import { useContext } from "react";
import { AppContext } from "@/api/Context";
import type { SearchableItem } from "@/features/home/utilis/searchTargets";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

interface SearchComponentsProps {
  searchArray: SearchableItem[];
  onResultSelect?: (item: SearchableItem) => void;
}

function SearchComponent({ searchArray, onResultSelect }: SearchComponentsProps) {
  const { setIsSearchOpen } = useContext(AppContext);

  return (
    <section
      className="relative w-full lg:w-[320px] gap-y-2"
      onBlur={(event) => {
        const nextFocusedElement = event.relatedTarget;
        if (
          !(nextFocusedElement instanceof Node) ||
          !event.currentTarget.contains(nextFocusedElement)
        ) {
          setIsSearchOpen(false);
        }
      }}
    >
      <SearchBar />
      <SearchResults items={searchArray} onResultSelect={onResultSelect} />
    </section>
  );
}

export default SearchComponent;
