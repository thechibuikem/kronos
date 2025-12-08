import VerticalNavigation from "@/features/home/components/VerticalNavigation"
// import AddKron from "@/components/handCraftedlUi/AddKron"
// import KronCard from "@/components/handCraftedlUi/KronCard"
// import SearchComponent from "@/components/sectionComponents/SearchComponent"
// import { ChartAreaStacked } from "@/components/handCraftedlUi/womwom"
import RepoList from "@/features/repositories/components/RepoList";


function Repositories() {
  return (


<section className="flex md:p-8 bg-gradient-to-r from-blue-950 to-blue-100 h-full min-h-screen relative w-screen">
<VerticalNavigation/>
<RepoList/>

</section>

  )
}

export default Repositories