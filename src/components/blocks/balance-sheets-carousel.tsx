'use client';

import { useGetBalanceSheetsQuery } from '@/lib/api/hooks';
import { BalanceSheet } from '@/types';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { BalanceCard } from '@/components/balance/BalanceCard';

export default function BalanceSheetsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { data: balanceData, isLoading, error } = useGetBalanceSheetsQuery();

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

  if (isLoading) {
    return <div>Loading balance data...</div>;
  }

  if (error) {
    console.error('Balance sheets error:', error);
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
        <h3 className="text-red-800 font-medium">Error loading balance data</h3>
        <p className="text-red-600 text-sm mt-1">{error.message}</p>
        {error.status && <p className="text-red-600 text-sm mt-1">Status: {error.status}</p>}
      </div>
    );
  }

  if (!balanceData?.data) {
    return (
      <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
        <p className="text-yellow-800">No balance data available</p>
      </div>
    );
  }

  const balanceItems = balanceData.data;
  console.log(balanceItems);
  return (
    <>
      <div className="hidden md:grid md:grid-cols-2 gap-6 w-full">
        {balanceItems.slice(0, 2).map((item: BalanceSheet, index: number) => (
          <BalanceCard key={item.id} title={`Balance ${index + 1}`} data={item} />
        ))}
      </div>
      {/* Mobile  */}
      <div className="md:hidden w-full max-w-3xl mx-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            {balanceItems.slice(0, 3).map((item: BalanceSheet, index: number) => (
              <CarouselItem key={item.id}>
                <BalanceCard title={`Balance Period ${index + 1}`} data={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Dot Navigation */}
        <Separator className="py-primary-half" />
        <div className="flex justify-center space-x-2">
          {balanceItems.slice(0, 3).map((item: BalanceSheet, index: number) => (
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
