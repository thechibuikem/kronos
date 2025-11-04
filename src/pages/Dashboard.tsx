import VerticalNavigation from "@/components/segmentComponents/VerticalNavigation"
// import AddKron from "@/components/handCraftedlUi/AddKron"
// import KronCard from "@/components/handCraftedlUi/KronCard"
// import SearchComponent from "@/components/sectionComponents/SearchComponent"
// import { ChartAreaStacked } from "@/components/handCraftedlUi/womwom"
import Layout from "@/components/segmentComponents/Layout"


function Dashboard() {
  return (
    // <div className="h-fit flex gap-x-16 md:p-[2rem] bg-gradient-to-r from-gray-400 to-gray-300">
    //   {/* <VerticalNavigation/>
    //   <SearchComponent/>
    //   <KronCard/>
    //   <AddKron/>
    //   <ChartAreaStacked/> */}

    // </div>

<section className="flex md:p-8 bg-gradient-to-r from-blue-950 to-blue-100 h-full min-h-screen relative max-w-screen">
<VerticalNavigation/>
<Layout />

</section>

  )
}

export default Dashboard