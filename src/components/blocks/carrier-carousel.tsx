'use client';

import CarriageCard from '../cards/CarriageCard';
import { Truck, Package } from 'lucide-react';
import { CourierInterface } from '../courier-interface';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '../ui/carousel';
import { useEffect, useState } from 'react';
import OrderCard from '../cards/OrderCard';

export default function CarrierCarousel() {
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
      <Separator className="py-2" />
      <div className="hidden md:grid md:grid-cols-3 grid-cols-1 gap-4 w-full">
        <CarriageCard
          icon={Truck}
          label="On route vehicles"
          value="110"
          changePercent={12}
          comparisonPeriod="than last week"
          iconBgColor="bg-status-completed"
          iconImg="/icons/truck-fast.svg"
        />
        <CarriageCard
          icon={Package}
          label="Delivered"
          value="78"
          changePercent={5}
          comparisonPeriod="than last week"
          iconBgColor="bg-status-waiting"
          iconImg="/icons/box-2.svg"
        />
        <CourierInterface />
      </div>

      {/* Mobile  */}
      <div className="md:hidden w-full max-w-3xl mx-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            <CarouselItem key={1}>
              <CarriageCard
                icon={Truck}
                label="On route vehicles"
                value="110"
                changePercent={12}
                comparisonPeriod="than last week"
                iconBgColor="bg-status-completed"
                iconImg="/icons/truck-fast.svg"
              />
            </CarouselItem>
            <CarouselItem key={2}>
              <CarriageCard
                icon={Package}
                label="Delivered"
                value="78"
                changePercent={5}
                comparisonPeriod="than last week"
                iconBgColor="bg-status-waiting"
                iconImg="/icons/box-2.svg"
              />
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
        <Separator className="py-primary-half" />
        <CourierInterface />
      </div>
    </>
  );
}
