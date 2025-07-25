// @/components/carriage/vehicle-overview.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Truck, Timer, CheckCircle, RotateCcw } from 'lucide-react';

export const statusIcons = {
  delivered: '🚚',
  'on-the-way': '🛵',
  waiting: '⏳',
  returning: '↩️',
};

const VehiclesOverview = () => {
  const stats = [
    {
      label: 'Delivered',
      icon: <CheckCircle className="h-4 w-4" />,
      percentage: 13.4,
      duration: '2hr 10min',
      color: 'bg-indigo-400',
    },
    {
      label: 'On the way',
      icon: <Truck className="h-4 w-4" />,
      percentage: 39.7,
      duration: '2hr 10min',
      color: 'bg-emerald-300',
    },
    {
      label: 'Waiting',
      icon: <Timer className="h-4 w-4" />,
      percentage: 17.4,
      duration: '2hr 10min',
      color: 'bg-sky-300',
    },
    {
      label: 'Returning',
      icon: <RotateCcw className="h-4 w-4" />,
      percentage: 14.6,
      duration: '2hr 10min',
      color: 'bg-orange-200',
    },
  ];

  // Calculate the total of original percentages
  const originalTotal = stats.reduce((sum, item) => sum + item.percentage, 0);

  // Normalize the percentages to sum to 100%
  const normalizedData = stats.map((item) => ({
    ...item,
    normalizedPercentage: (item.percentage / originalTotal) * 100,
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Vehicles Overview</CardTitle>
      </CardHeader>
      <div className="px-6">
        {/* Labels - Desktop only */}
        <div className="hidden md:flex text-left justify-between text-sm text-gray-600 mb-2">
          {normalizedData.map((stat) => (
            <div key={stat.label}>{stat.label}</div>
          ))}
        </div>
      </div>

      {/* Progress Bar - Full width */}
      <div className="text-center w-full h-8 flex rounded-lg overflow-hidden px-5">
        {normalizedData.map((stat, index) => {
          const isFirst = index === 0;
          const isLast = index === stats.length - 1;

          return (
            <div
              key={stat.label}
              className={`
                ${stat.color} flex items-center justify-center
               
                ${isFirst ? 'rounded-l-lg' : ''} 
                ${isLast ? 'rounded-r-lg' : ''}
              `}
              style={{ width: `${stat.normalizedPercentage}%` }}
            >
              {/* Desktop Label */}
              <span className="hidden md:block text-sm font-medium">{stat.percentage}%</span>
              {/* Mobile Label */}
              <div className="md:hidden flex items-center gap-1 text-sm font-medium">
                {stat.icon}
                <span></span>
              </div>
            </div>
          );
        })}
      </div>

      <CardContent className="pt-6">
        {/* Stats Grid */}
        <div className="grid gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white border">{stat.icon}</div>
                <span className="font-medium">{stat.label}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="w-16 text-right">{stat.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VehiclesOverview;
