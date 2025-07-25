'use client';

import { DataTable } from '@/components/invoices/data-table';
import { columns } from '@/components/invoices/columns';
import { useGetInvoicesQuery } from '@/lib/api/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import type { operations } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type InvoiceCollection = operations['getInvoices']['responses']['200']['content']['application/json'];
type Invoice = NonNullable<InvoiceCollection['data']>[number];

function mapApiInvoiceToTableInvoice(apiInvoice: Invoice) {
  const total = typeof apiInvoice.invoice_total === 'string' ? parseFloat(apiInvoice.invoice_total) : 0;
  const subtotal = typeof apiInvoice.invoice_subtotal === 'string' ? parseFloat(apiInvoice.invoice_subtotal) : 0;

  return {
    id: apiInvoice.id || '',
    number: apiInvoice.id || '',
    total,
    issuedDate: apiInvoice.created_at || new Date().toISOString(),
    status: apiInvoice.status || 'pending',
    customer: {
      name: apiInvoice.invoice_company_name || '',
      company: apiInvoice.invoice_company_code || '',
      email: apiInvoice.invoice_company_email || '',
      address: apiInvoice.invoice_company_address || '',
    },
    items: [
      {
        id: '1',
        name: 'Invoice Item',
        quantity: 1,
        price: subtotal,
        total,
        ean: '',
        sku: '',
      },
    ],
    note: '',
  };
}

export function InvoicesTable() {
  const { data, isLoading, error } = useGetInvoicesQuery();

  if (error) {
    return <div className="text-red-500">Error loading invoices. Please try again later.</div>;
  }

  const tableInvoices = data?.data?.map(mapApiInvoiceToTableInvoice) || [];

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-base font-bold tracking-tight">Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <DataTable columns={columns} data={tableInvoices} />
        )}
      </CardContent>
    </Card>
  );
}
