// src/components/dashboard/SalesTable.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SingleDateDropdown from '../blocks/SingleDateDropdown';

export interface SaleRecord {
  date: string;
  status: 'Paid' | 'Pending';
  orderNumber: string;
  earnings: string;
}

interface SalesTableProps {
  sales: SaleRecord[];
  isLoading?: boolean;
}

export const SalesTable: React.FC<SalesTableProps> = ({ sales, isLoading }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row pt-3 items-center justify-between">
        <CardTitle>Last sales</CardTitle>
        <div className="flex gap-[40px]">
          <SingleDateDropdown />
          <Select defaultValue="10">
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-transparent border-none">
            <TableRow className="border-none">
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Order number</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No sales available.
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale, index) => (
                <TableRow key={index} className={`border-none ${index % 2 === 0 ? 'bg-white' : 'bg-container'}`}>
                  <TableCell className="py-4">{sale.date}</TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        sale.status === 'Paid' ? 'bg-status-completed text-foreground' : 'bg-orange-50 text-foreground'
                      }`}
                    >
                      {sale.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 hidden md:block">{sale.orderNumber}</TableCell>
                  <TableCell className="py-4 text-right">€{sale.earnings}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
