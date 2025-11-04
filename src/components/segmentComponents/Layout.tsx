import TopBar from "../sectionComponents/TopBar"
import KronList from "../sectionComponents/KronList"
import ChartAndAnalysis from "../sectionComponents/ChartAndAnalysis"

function Layout() {
  return (
// 

<section className="w-fit h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">

<TopBar />
<KronList />
<ChartAndAnalysis />

    </section>
  )
}

export default Layout