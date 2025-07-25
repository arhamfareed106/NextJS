// src/components/dashboard/BalanceCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BalanceSheet } from '@/types';

interface BalanceCardProps {
  title: string;
  data: BalanceSheet;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ title, data }) => {
  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Calculation period</p>
            <p className="text-sm">{`${formatDate(data.period_start)} - ${formatDate(data.period_end)}`}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payments are planned</p>
            <p className="text-sm">€{data.payouts_amount || '0.00'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-sm">€{data.user_revenue || '0.00'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Returns</p>
            <p className="text-sm">€{data.returns_amount || '0.00'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Commission on refunds</p>
            <p className="text-sm">€{data.return_commissions_cost || '0.00'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Logistics costs for returns</p>
            <p className="text-sm">€{data.return_logistics_cost || '0.00'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payout</p>
            <p className="text-sm">
              €{data.payouts_amount || '0.00'} (net of refunds, logistics services, commissions)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
