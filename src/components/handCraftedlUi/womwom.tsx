"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked area chart"

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
    label: "Last Week",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "This Week",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaStacked() {
  return (
    <Card className="h-fit lg:w-[60%] transparent-cards">
      <CardHeader>
        <CardTitle>Krons Chart</CardTitle>
        <CardDescription className="text-white">
          Showing all active Krons for the past 1 week
        </CardDescription>
      </CardHeader>
      {/* the container housing the wires */}
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {/* the areas stack each other in order of appearance */}
            <Area
              dataKey="mobile"
              type="natural"
              fill="#163e79b7"
              // fill="#4ah"
              fillOpacity={0.4}
              // stroke="var(--color-mobile)"
              stroke="#300ddf4a"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="#150d40cb"
              // fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="#150d404a"
              // stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-white flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
