import VerticalNavigation from "@/features/home/components/VerticalNavigation"

import Layout from "@/features/home/components/Layout"
import { useEffect } from "react"


function Dashboard() {

useEffect(()=>{
  
})




return (
<section className="flex md:p-8 bg-gradient-to-r from-blue-950 to-blue-100 h-full min-h-screen relative max-w-screen">
<VerticalNavigation/>
<Layout />
</section>

  )
}

export default Dashboard