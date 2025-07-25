import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const InvoiceCard = ({ label = 'Clients', value = '100', change = '12', changeType = 'increase' }) => {
  const isPositive = changeType === 'increase';

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-muted-foreground">{label}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold ">{value}</span>
            <div
              className={`flex items-center border gap-1 px-2 py-1 text-xs rounded-full ${
                isPositive ? 'text-green-100 bg-green-50 border-green-100' : 'text-red-50 bg-[#FFF0F4] border-red-50'
              }`}
            >
              {isPositive ? (
                <Image src={'/icons/arrow-up-green.svg'} width={14} height={14} alt="" />
              ) : (
                <Image src={'/icons/arrow-up-red.svg'} width={14} height={14} alt="" />
              )}
              <span>{change}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
