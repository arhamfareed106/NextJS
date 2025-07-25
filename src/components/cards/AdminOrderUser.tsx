// components/cards/StatisticsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ShoppingBag, Calendar, LucideIcon } from "lucide-react";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  iconBgColor?: string;
  currency?: string;
  subtitle?: string;
}

const icons: Record<string, LucideIcon> = {
  TrendingUp,
  ShoppingBag,
  Calendar,
};

export default function StatisticsCard({
  title,
  value,
  icon = "TrendingUp",
  iconBgColor = "blue",
  currency = "€",
  subtitle,
}: StatisticsCardProps) {
  const IconComponent = icons[icon];

  const bgColorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className={`rounded-full p-2 ${bgColorClasses[iconBgColor]}`}>
          <IconComponent className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currency}
          {typeof value === "number"
            ? new Intl.NumberFormat("en-US").format(value)
            : value}
        </div>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
