"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart"
import { type ChartConfig } from "@/shared/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/shared/components/ui/chart"

const chartConfig = {
  orders: {
    label: "Orders",
    color: "#2563eb"
  }
} satisfies ChartConfig

export const TotalOrdersPerMonthChart = ({ stats }: { stats: { month: string; orders: number }[] }) => {
  const chartData = stats

  return (
    <div className='w-full'>
      <h2 className='font-bold text-2xl mb-4'>Total Orders</h2>
      <ChartContainer config={chartConfig} className='h-[500px] max-w-full w-full'>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
          <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
