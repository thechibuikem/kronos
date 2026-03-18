import { ChartAreaStacked } from "./womwom"
import AnalysisDisplayer from "./AnalysisDisplayer"

function ChartAndAnalysis() {
  return (
    <section className="w-full my-8 flex gap-y-8 flex-col lg:flex-row gap-x-8 md:px-8 px-4 pt-8  bg-yelow-500">
    <ChartAreaStacked/>
    <AnalysisDisplayer/>
    </section>
  )
}

export default ChartAndAnalysis