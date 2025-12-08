import TopBar from "./TopBar"
import KronList from "../../watchlist/components/KronList"
import ChartAndAnalysis from "../../analysis/components/ChartAndAnalysis"

function Layout() {
  return (
<section className="w-fit h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">

<TopBar />
<KronList />
<ChartAndAnalysis />
    </section>
  )
}

export default Layout