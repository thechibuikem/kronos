import { useContext } from "react";
import { AppContext } from "@/api/Context";
import fuzzySearch from "@/features/home/utilis/fuzzySimulation";
import { type Repo } from "@/features/repos/slices/allRepo.Slice";

interface SearchResultsParams {
  repos: Repo[];
}

export default function SearchResults({ repos }: SearchResultsParams) {
  const context = useContext(AppContext);
  if (!context) {
    console.log("Dashboard must be used inside AppProvider");
  }

  const { isSearchOpen, setIsSearchOpen, searchValue } = context;

  let matches: Partial<Repo>[] = searchValue
    ? repos.filter((repo) => fuzzySearch(searchValue, repo.repoName, 1))
    : [{ repoName: "" }];

  if (matches.length === 0) {
    matches = [{ repoName: "No results found" }];
  }

  return (
    <>
      {isSearchOpen && (
        <div
          className="absolute top-14 left-0 w-full sm:w-[20rem] md:w-[24rem] max-h-72 overflow-y-auto
            bg-[#111118] border border-[#1e293b] rounded-xl shadow-2xl shadow-black/40 z-30"
          onMouseOver={() => setIsSearchOpen(isSearchOpen)}
        >
          <div className="flex flex-col py-2">
            {matches.map((match, i) => (
              <a
                key={i}
                href="https://www.google.com"
                className="px-4 py-2.5 text-sm text-[#94a3b8] hover:bg-[#0d0d15] hover:text-[#e2e8f0] transition-colors"
              >
                {match.repoName}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
