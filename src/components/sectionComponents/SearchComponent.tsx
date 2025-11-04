import SearchBar from "../handCraftedlUi/SearchBar"
import SearchResults from "../handCraftedlUi/SearchResults"

export interface repoItem{
  name:string,
  id:number
}

function SearchComponent() {


  return (
    <section className="relative md:w-[40rem] gap-y-2 px-4 md:px-8">
    <SearchBar/>
    <SearchResults/>
    </section>
  )
}

export default SearchComponent