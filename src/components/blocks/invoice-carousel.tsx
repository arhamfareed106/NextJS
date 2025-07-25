'use client';

import InvoiceCard from '../cards/InvoiceCard';
import type { operations } from '@/types/api';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';
import { Separator } from '../ui/separator';
import { useEffect, useState } from 'react';

type InvoiceCollection = operations['getInvoices']['responses']['200']['content']['application/json'];
type Invoice = NonNullable<InvoiceCollection['data']>[number];

interface InvoiceCarouselProps {
  invoices: Invoice[];
}

export default function InvoiceCarousel({ invoices }: InvoiceCarouselProps) {
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((inv) => inv.status === 'paid').length;
  const unpaidInvoices = invoices.filter((inv) => inv.status === 'pending').length;

  const totalAmount = invoices.reduce((sum, inv) => {
    const total = typeof inv.invoice_total === 'string' ? parseFloat(inv.invoice_total) : 0;
    return sum + total;
  }, 0);

  const paidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => {
      const total = typeof inv.invoice_total === 'string' ? parseFloat(inv.invoice_total) : 0;
      return sum + total;
    }, 0);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleClick = (index: number) => {
    api?.scrollTo(index);
  };
  return (
    <>
      <div className=" hidden lg:grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
        <InvoiceCard label="Total Invoices" value={totalInvoices.toString()} change="" changeType="" />
        <InvoiceCard label="Total Amount" value={`€${totalAmount.toLocaleString()}`} change="" changeType="" />
        <InvoiceCard
          label="Paid"
          value={`€${paidAmount.toLocaleString()}`}
          change={paidInvoices.toString()}
          changeType="increase"
        />
        <InvoiceCard
          label="Unpaid"
          value={`€${(totalAmount - paidAmount).toLocaleString()}`}
          change={unpaidInvoices.toString()}
          changeType=""
        />
      </div>
      {/* Mobile  */}
      <div className="md:hidden  w-full max-w-3xl mx-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            <CarouselItem key={1}>
              <div className="grid grid-cols-2 gap-4">
                <InvoiceCard label="Total Invoices" value={totalInvoices.toString()} change="" changeType="" />
                <InvoiceCard label="Total Amount" value={`€${totalAmount.toLocaleString()}`} change="" changeType="" />
              </div>
            </CarouselItem>
            <CarouselItem key={2}>
              <div className="grid grid-cols-2 gap-4">
                <InvoiceCard
                  label="Paid"
                  value={`€${paidAmount.toLocaleString()}`}
                  change={paidInvoices.toString()}
                  changeType="increase"
                />
                <InvoiceCard
                  label="Unpaid"
                  value={`€${(totalAmount - paidAmount).toLocaleString()}`}
                  change={unpaidInvoices.toString()}
                  changeType=""
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        {/* Dot Navigation */}
        <Separator className="py-primary-half" />
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-2 h-2 rounded-full transition-colors ${current === index ? 'bg-primary' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
