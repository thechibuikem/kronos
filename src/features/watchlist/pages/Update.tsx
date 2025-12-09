import VerticalNavigation from "@/features/home/components/VerticalNavigation"
import WatchList from "@/features/watchlist/components/WatchList"


function Update() {
return (
<section className="flex md:p-8 bg-gradient-to-r from-blue-950 to-blue-100 h-full min-h-screen relative w-screen">
<VerticalNavigation/>
<WatchList/>
</section>
  )
}

export default Update