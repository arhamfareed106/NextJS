import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Clock, CheckCircle2, RefreshCcw, RotateCcw, LucideIcon, Hourglass } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusVariant = 'default' | 'waiting' | 'completed' | 'processing' | 'returned';

interface StatusCardProps {
  title?: string;
  value?: string | number;
  change?: number;
  period?: string;
  variant?: StatusVariant;
  icon?: StatusVariant;
  iconImage?: string; // ✅ new prop for custom image icon
}

const icons: Record<StatusVariant, LucideIcon> = {
  default: Clock,
  waiting: Hourglass,
  completed: CheckCircle2,
  processing: RefreshCcw,
  returned: RotateCcw,
};

const colors: Record<StatusVariant, string> = {
  default: 'bg-status-default',
  waiting: 'bg-status-waiting',
  completed: 'bg-status-completed',
  processing: 'bg-status-processing',
  returned: 'bg-status-returned',
};

const OrderStatusCard = ({
  title = 'Status',
  value = '0',
  change = 0,
  period = 'This week',
  variant = 'default',
  icon = 'default',
  iconImage, // ✅ destructure the new prop
}: StatusCardProps) => {
  const Icon = icons[icon];

  return (
    <Card>
      <CardContent className="py-[30px]">
        <div className="flex flex-col justify-evenly h-full space-y-4">
          <div className="flex flex-col items-start gap-5">
            <div className={cn('p-2 rounded-full', colors[variant])}>
              {iconImage ? (
                <Image
                  src={iconImage}
                  alt="status-icon"
                  width={32}
                  height={32}
                  className="w-[24px] h-[24px] object-contain"
                />
              ) : (
                <Icon className="w-8 h-8 text-gray-700" />
              )}
            </div>
            <span className=" text-base font-bold text-[#777E90]">{title}</span>
          </div>

          <div className="md:text-4xl text-3xl font-bold">{value}</div>

          <div className="flex items-center md:justify-start justify-between md:space-x-2 space-x-1">
            <div
              className={cn(
                'flex items-center px-2 py-1 rounded-full text-xs border',
                change >= 0 ? 'bg-green-50 text-green-100 border-green-100' : 'bg-[#FFF0F4] text-red-700 border-red-50',
              )}
            >
              {change >= 0 ? (
                <Image src={'/icons/arrow-up-green.svg'} width={14} height={14} alt="" />
              ) : (
                <Image src={'/icons/arrow-up-red.svg'} width={14} height={14} alt="" />
              )}
              {Math.abs(change)}%
            </div>
            <span className="md:text-sm text-xs text-gray-500">{period}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;
