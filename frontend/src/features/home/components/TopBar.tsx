import Introtext from "./Introtext";
import SearchComponent from "./SearchComponent";
import type { SearchableItem } from "@/features/home/utilis/searchTargets";

interface TopBarProps {
  searchArray: SearchableItem[];
  onSearchResultSelect?: (item: SearchableItem) => void;
}

function TopBar({ searchArray, onSearchResultSelect }: TopBarProps) {
  return (
    <section className="flex flex-col gap-y-5 lg:flex-row lg:items-center justify-between">
      <Introtext />
      <SearchComponent
        searchArray={searchArray}
        onResultSelect={onSearchResultSelect}
      />
    </section>
  );
}

export default TopBar;
