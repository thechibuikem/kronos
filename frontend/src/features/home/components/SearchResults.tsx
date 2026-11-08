import { useContext } from "react";
import { AppContext } from "@/api/Context";
import fuzzySearch from "@/features/home/utilis/fuzzySimulation";
import {
  getSearchTargetId,
  type SearchableItem,
} from "@/features/home/utilis/searchTargets";

interface SearchResultsParams {
  items: SearchableItem[];
  onResultSelect?: (item: SearchableItem) => void;
}

export default function SearchResults({
  items,
  onResultSelect,
}: SearchResultsParams) {
  const context = useContext(AppContext);
  const { isSearchOpen, setIsSearchOpen, searchValue } = context;

  const matches = searchValue
    ? items.filter((item) => fuzzySearch(searchValue, item.repoName, 1))
    : [];

  function handleSelect(item: SearchableItem) {
    onResultSelect?.(item);
    setIsSearchOpen(false);
    requestAnimationFrame(() => {
      document
        .getElementById(getSearchTargetId(item.repoId))
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <>
      {isSearchOpen && (
        <div
          className="absolute top-14 left-0 w-full sm:w-[20rem] md:w-[24rem] max-h-72 overflow-y-auto
            bg-[#111118] border border-[#1e293b] rounded-xl shadow-2xl shadow-black/40 z-30"
        >
          <div className="flex flex-col py-2">
            {!searchValue ? (
              <p className="px-4 py-2.5 text-sm text-[#64748b]">
                Type to search
              </p>
            ) : matches.length === 0 ? (
              <p className="px-4 py-2.5 text-sm text-[#64748b]">
                No results found
              </p>
            ) : (
              matches.map((item) => (
                <button
                  key={item.repoId}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2.5 text-left text-sm text-[#94a3b8] hover:bg-[#0d0d15] hover:text-[#e2e8f0] transition-colors"
                >
                  {item.repoName}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
