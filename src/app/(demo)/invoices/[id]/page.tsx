'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { useGetInvoiceByIdQuery } from '@/lib/api/hooks';
import { use, useRef } from 'react';
import { API_CONFIG } from '@/lib/api/config';
import Image from 'next/image';
const html2pdf = require('html2pdf.js');

export default function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const printRef = useRef<HTMLDivElement>(null);

  const {
    data: invoice,
    isLoading,
    error,
  } = useGetInvoiceByIdQuery({
    path: { id: resolvedParams.id },
  });

  const handleDownload = () => {
    const element = printRef.current;
    if (!element) return;
    html2pdf().from(element).save(`invoice-${resolvedParams.id}.pdf`);
  };

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Restore state
    }
  };

  if (error) {
    console.error('Invoice error:', error);
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">API Debug Info</h1>
        <div className="mb-4">
          <p>Base URL: {API_CONFIG.baseUrl}</p>
          <p>Proxy URL: {API_CONFIG.proxyUrl}</p>
          <p>URL ID: {resolvedParams.id}</p>
        </div>
        <div className="bg-red-50 p-4 rounded">
          <h2 className="font-bold text-red-700">Error Details:</h2>
          <pre className="mt-2 text-sm">{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-4">Loading invoice...</div>;
  if (!invoice) return <div>Invoice not found</div>;

  return (
    <ContentLayout title={`Invoice ${invoice.id}`}>
      <div className="mx-auto py-4">
        <div className="mx-auto">
          <div className="flex flex-col items-start lg:flex-row gap-[30px]">
            {/* Invoice Content to Download/Print */}
            <Card ref={printRef} className="p-6 md:p-8 flex flex-col gap-[30px] max-w-[656px] w-full bg-white">
              <div className="flex flex-col bg-gray-light lg:py-[36px] lg:px-[48px] p-5 rounded-[15px] md:flex-row justify-between gap-6">
                <div className="flex flex-col gap-[30px]">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {invoice.invoice_company_name?.[0] || 'M'}
                    </div>
                    <span className="font-semibold">Invoice</span>
                  </div>
                  <address className="not-italic text-xs font-medium leading-[21px] text-muted-foreground">
                    {invoice.invoice_company_address}
                    <br />
                    {invoice.invoice_company_phone}
                    <br />
                    {invoice.invoice_company_email}
                  </address>
                </div>
                <div className="flex flex-col gap-[30px]">
                  <h2 className="text-[24px] font-bold">{invoice.id}</h2>
                  <div className="flex flex-col gap-2.5">
                    <p className="text-muted-foreground font-medium text-xs">
                      Created Date:{' '}
                      <span className="text-foreground">
                        {new Date(invoice.period_start || '').toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-[30px]">
                <div className="bg-gray-light rounded-lg lg:py-[36px] lg:px-[48px] p-5">
                  <h3 className="font-bold text-base mb-4">Buyer:</h3>
                  <div className="text-[13px] text-muted-foreground">
                    <p className="font-medium">{invoice.invoice_company_name}</p>
                    <p>{invoice.invoice_company_code}</p>
                    <p>{invoice.invoice_company_vat_code}</p>
                    <p>{invoice.invoice_company_address}</p>
                    <p className="text-gray-600 mt-2">{invoice.invoice_company_email}</p>
                  </div>
                </div>
                <div className="bg-gray-light rounded-lg p-6">
                  <h3 className="font-bold text-base mb-4">Seller:</h3>
                  <div className="text-[13px] text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Due:</span>
                      <span className="font-medium">€{invoice.invoice_total?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank name:</span>
                      <span>{invoice.bill_to_bank_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Country:</span>
                      <span>{invoice.bill_to_country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IBAN:</span>
                      <span>{invoice.bill_to_iban}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SWIFT code:</span>
                      <span>{invoice.bill_to_swift}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-2.5"></div>
                <div className="bg-gray-50 rounded-lg p-6 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-base font-medium">Subtotal:</span>
                      <span>€{invoice.invoice_subtotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-base font-medium">VAT:</span>
                      <span>€{invoice.invoice_vat?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-muted-foreground text-base font-medium">Total:</span>
                      <span className="font-medium">€{invoice.invoice_total?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Buttons */}
            <Card className="p-6 md:p-8 max-w-[374px] w-full h-auto no-print">
              <div className="flex gap-3">
                <Button className="max-w-[239px] w-full" onClick={handleDownload}>
                  Download
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Image src={'/icons/printer.svg'} width={24} height={24} alt="Print" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
