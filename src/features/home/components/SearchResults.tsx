import {
  Card,
  CardContent,
} from "@/features/home/ui/card"
import { useContext } from "react"
import { AppContext } from "@/api/Context"
import fuzzySearch from "@/features/home/utilis/fuzzySimulation" //importing fuzzy search function for filtering
// import { useAllReposHandler } from "@/features/watchlist/handlers/allRepo.Handlers"
import type { Repo } from "@/features/watchlist/slices/allRepo.Slice"

interface SearchResultsParams{
repos:Repo[]
}

// basically repo here is an array of repository objects that we filter to get our search results
export default function SearchResults({repos}:SearchResultsParams) {
  // initializing context
const context = useContext(AppContext)

// adding guard for context
 if (!context) {
    console.log("Dashboard must be used inside AppProvider");
  }

// const {repos}= useAllReposHandler()


  // destructuring state and dispatch from context
  const {isSearchOpen,setIsSearchOpen,searchValue}= context

// creating an array of matches from my fuzzy search function
let matches:Partial<Repo>[] = searchValue
  ? repos.filter((repo) => fuzzySearch(searchValue, repo.repoName, 1))
  : [{ repoName: "" }];//if no search value is entered clear my search bar

// if nothing is found display no result found
if (matches.length == 0) {
  matches = [
    {
      repoName: "no result found",
    },
  ];
}



  return (
    // conditional rendering of results
    <>
   { isSearchOpen
     && 
     <Card className="absolute top-15 w-[22rem] h-fit sm:w-[20rem] md:w-[36rem] transparent-cards z-30" onMouseOver={()=>{setIsSearchOpen(isSearchOpen)}}>
    
      {/* the container housing the wires */}
      
      <CardContent className="">
    <div className="leading-8 flex flex-col">
{
    matches.map((match)=> <a href="https://www.google.com" className="hover:scale-99 transition-all duration-500">
        {match.repoName}
    </a>)
}


</div>
      </CardContent>
    </Card>}
    </>
  )
}