import type { Repo } from "@/features/watchlist/slices/allRepo.Slice"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

export interface repoItem{
  id:number
  name:string,
}

function SearchComponent(SearchArray:Repo[]) {


  return (
    <section className="relative md:w-[40rem] gap-y-2 px-4 md:px-8">
    <SearchBar/>
    <SearchResults repos={SearchArray}/>
    </section>
  )
}

export default SearchComponent