import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useContext } from "react"
import { AppContext } from "@/Context/Context"
import {type repoItem } from "../sectionComponents/SearchComponent"
import fuzzySearch from "@/features/fuzzySimulation" //importing fuzzy search function for filtering



export default function SearchResults() {
  // initializing context
const context = useContext(AppContext)

// adding guard for context
 if (!context) {
    console.log("Dashboard must be used inside AppProvider");
  }

  // destructuring state and dispatch from context
  const {isSearchOpen,setIsSearchOpen,searchValue}= context


// creating a repository list
const repoList:repoItem[] = JSON.parse(localStorage.getItem("repoList")|| "[]") as repoItem[]

// creating an array of matches from my fuzzy search function
let matches = searchValue ? repoList.filter((repoItem)=>fuzzySearch(repoItem.name,searchValue,0)):[{name:""}]//if no search value is entered clear my search bar

// if nothing is found display no result found
if (matches.length == 0) {
  matches = [{
    name: "no result found"
  }]
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
        {match.name}
    </a>)
}


</div>
      </CardContent>
    </Card>}
    </>
  )
}