import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Package } from 'lucide-react';
import Image from 'next/image';

type IconType = typeof Truck | typeof Package;

interface CarrierProps {
  icon?: IconType;
  label?: string;
  value?: string | number;
  changePercent?: number;
  comparisonPeriod?: string;
  iconBgColor?: string;
  iconImg?: string;
}

const CarrierCard: React.FC<CarrierProps> = ({
  icon: Icon = Truck,
  label = 'On route vehicles',
  value = '100',
  changePercent = 12,
  comparisonPeriod = 'than last week',
  iconBgColor = 'bg-emerald-400',
  iconImg,
}) => {
  return (
    <Card className="">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Top row with icon and change stats */}
          <div className="flex items-start justify-between">
            <div className={`${iconBgColor} h-[45px] w-[45px] flex justify-center items-center rounded-full`}>
              {iconImg && <Image src={iconImg} width={24} height={24} alt="Icon" />}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-green-50 flex items-center text-green-100">
                {' '}
                <Image src={'/icons/arrow-up-green.svg'} width={14} height={14} alt="" /> {changePercent}%
              </span>
              <span className="text-xs text-muted-foreground font-bold">{comparisonPeriod}</span>
            </div>
          </div>

          {/* Label below icon */}
          <div className="space-y-1">
            <span className="text-base font-bold text-muted-foreground">{label}</span>
            <h2 className="text-4xl font-semibold">{value}</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarrierCard;
