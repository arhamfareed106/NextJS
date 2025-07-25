/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { apiClient, handleApiResponse } from '@/lib/api/client';

interface ChartDataPoint {
  day: string;
  value: number;
}

export const SalesChart: React.FC = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [period, setPeriod] = useState('last-week');

  const getDateRange = (period: string) => {
    const end = new Date();
    const start = new Date();

    if (period === 'last-week') {
      start.setDate(end.getDate() - 7);
    } else if (period === 'last-month') {
      start.setMonth(end.getMonth() - 1);
    } else if (period === 'last-year') {
      start.setFullYear(end.getFullYear() - 1);
    }

    const format = (date: Date) => date.toISOString().split('T')[0]; // YYYY-MM-DD

    return {
      start_date: format(start),
      end_date: format(end),
    };
  };

  const fetchChartData = async () => {
    const { start_date, end_date } = getDateRange(period);

    const result = await handleApiResponse<ChartDataPoint[]>(
      apiClient.GET('/api/orders/daily-stats', {
        query: { start_date, end_date },
      }),
    );

    if (result.data) {
      setData(result.data);
    } else {
      console.error('Failed to load chart data:', result.error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [period]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Product Sales</CardTitle>
        <Select defaultValue="last-week" onValueChange={setPeriod}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-week">Last week</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">No data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#CABEFF" barSize={10} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
