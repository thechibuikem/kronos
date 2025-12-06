import { Input } from "@/features/home/ui/input"; 
import { CiSearch } from "react-icons/ci";
import { TbZoomCancel } from "react-icons/tb";
import { AppContext } from "@/api/Context";
import {useContext } from "react";

function SearchBar() {
  // initializing context
const context = useContext(AppContext)


// adding guard for context
 if (!context) {
    console.log("Dashboard must be used inside AppProvider");
  }

  // destructuring state and dispatch from context
  const {isSearchOpen,setIsSearchOpen,setSearchValue}= context

  return (
  <div className="relative flex items-center h-fit">

  <Input className="md:min-w-full rounded-full p-6 border-2 border-[#4a556530] bg-[#1e1a4f5b] focus-visible:ring-0 text-[#ececec] focus-visible:ring-offset-0 focus-visible:border-[#ededed]"
    placeholder="search for a kron"
    onFocus={()=>{setIsSearchOpen(!isSearchOpen)}}
    onBlur={()=>setIsSearchOpen(!isSearchOpen)}
    onChange={(e)=>{setSearchValue(e.target.value)}}
    />
    
    <button className="absolute right-4 cursor-pointer" onClick={()=>{setIsSearchOpen(!isSearchOpen)}}>
      
{
isSearchOpen?<TbZoomCancel size={20} color="#ededed" />: <CiSearch size={20} color="#ededed" />
}

    </button> 

  </div>
    )
}

export default SearchBar