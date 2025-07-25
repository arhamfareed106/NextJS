'use client';

import { TrendingUp } from 'lucide-react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import DateDropdown from './date-dropdown';
import SingleDateDropdown from './SingleDateDropdown';
import MonthDropdown from '../ui/MonthDropdown';

export const description = 'A line chart showing revenue and returns trends';

const chartData = [
  { month: '10', revenue: 186, returns: 80 },
  { month: '11', revenue: 305, returns: 200 },
  { month: '12', revenue: 237, returns: 120 },
  { month: '13', revenue: 73, returns: 190 },
  { month: '14', revenue: 209, returns: 130 },
  { month: '15', revenue: 114, returns: 240 },
  { month: '16', revenue: 94, returns: 340 },
  { month: '17', revenue: 84, returns: 440 },
  { month: '18', revenue: 64, returns: 540 },
  { month: '19', revenue: 54, returns: 640 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
  returns: {
    label: 'Returns',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card>
      <div className="flex px-6 pt-6 lg:flex-row flex-col  justify-between gap-[30px] lg:gap-0 lg:items-center">
        <CardHeader className="p-0">
          <CardTitle className="text-base ">Store Sales Statistics</CardTitle>
          <CardDescription className="font-bold text-foreground text-[24px]">€30,000</CardDescription>
          <CardDescription className="font-bold text-foreground ">
            +€30,000 <span className="text-muted-foreground"> from last month</span>
          </CardDescription>
        </CardHeader>
        <div className="flex gap-[30px] items-center">
          <div className="w-[129px] ">
            <SingleDateDropdown />
          </div>
          <div className="w-[129px] ">
            <MonthDropdown />
          </div>
        </div>
      </div>
      <CardContent className=" ">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 40, // Add some space for the legend
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
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (value >= 10000) return `${value / 1000}K`;
                if (value >= 1000) return `${value / 1000}K`;
                return value;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              formatter={(value) => {
                if (value === 'revenue') return <span style={{ color: '#EF709B' }}>Revenue</span>;
                if (value === 'returns') return <span style={{ color: '#696EFF' }}>Returns</span>;
                return value;
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="returns"
              type="natural"
              stroke="#696EFF"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, fill: '#696EFF' }}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="#EF709B"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, fill: '#EF709B' }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">January - 2024</div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
