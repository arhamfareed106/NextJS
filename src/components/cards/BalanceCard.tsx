import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line } from "recharts";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

type LucideIconName = keyof typeof LucideIcons;

interface EarningsCardProps {
  title: string;
  amount?: string;
  currency?: string;
  percentage?: string;
  timeframe?: string;
  iconName?: LucideIconName;
  iconBgColor?: string;
  data?: Array<{ value: number }>;
}

const EarningsCard: React.FC<EarningsCardProps> = ({
  title,
  amount = "128k",
  currency = "€",
  percentage = "12",
  timeframe = "This week",
  iconName = "MessageSquare",
  iconBgColor = "emerald",
  data,
}) => {
  const Icon: LucideIcon = LucideIcons[iconName] as LucideIcon;
  const isNegative = Number(percentage) < 0;
  const lineColor = isNegative ? "#EF4444" : "#34D399";

  // Generate random data if not provided
  const chartData = useMemo(() => {
    if (data) return data;
    return Array.from({ length: 7 }, () => ({
      value: Math.floor(Math.random() * 100),
    }));
  }, [data]);

  // Map color names to Tailwind classes
  const getColorClasses = (color: string) => ({
    bg: `bg-${color}-100`,
    text: `text-${color}-600`,
  });

  const colorClasses = getColorClasses(iconBgColor);

  return (
    <Card className="p-6 bg-white">
      <CardContent className="p-0">
        <div className="flex justify-between items-end space-x-2">
          {/* Left side: Icon and Title */}
          <div className="space-y-6">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses.bg}`}
            >
              <Icon className={`w-6 h-6 ${colorClasses.text}`} />
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">{title}</p>
              <h2 className="text-4xl font-bold">
                {currency}
                {amount}
              </h2>
            </div>
          </div>

          {/* Right side: Chart */}
          <div className="mt-2">
            <LineChart width={100} height={60} data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>

            {/* Stats at bottom */}
            <div className="flex items-center text-sm">
              {isNegative ? (
                <LucideIcons.ArrowDown className="w-4 h-4 text-red-500 mr-1" />
              ) : (
                <LucideIcons.ArrowUp className="w-4 h-4 text-emerald-500 mr-1" />
              )}
              <span
                className={isNegative ? "text-red-500" : "text-emerald-500"}
              >
                {percentage}%
              </span>
              <span className="text-gray-500 ml-1">{timeframe}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsCard;
