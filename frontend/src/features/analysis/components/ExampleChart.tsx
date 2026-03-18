import { Bar,BarChart } from "recharts";

import {type ChartConfig ,ChartContainer } from "@/features/home/ui/chart";

export function MyChart() {

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig


  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] h-[20rem] max-w-[10rem] aspect-square bg-red-500">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default function ChartWrapper(){
    return(
        <figure className="bg-[#000000cb] w-fit h-fit">

        <MyChart/>
        </figure>
    )
}
