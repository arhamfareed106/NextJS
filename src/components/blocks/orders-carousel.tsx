'use client';

import OrderCard from '@/components/cards/OrderCard';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';

export default function OrdersCarousel() {
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
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        <OrderCard
          title="Completed"
          value="2541"
          change={-5}
          icon="completed"
          variant="completed"
          iconImage="/icons/task.svg"
        />

        <OrderCard
          title="Processing"
          value="556"
          change={-12}
          icon="processing"
          variant="processing"
          iconImage="/icons/rotate-left.svg"
        />

        <OrderCard
          title="Waiting"
          value="12100"
          change={12}
          icon="waiting"
          variant="waiting"
          iconImage="/icons/timer.svg"
        />

        <OrderCard
          title="Returned"
          value="12100"
          change={+7}
          icon="returned"
          variant="returned"
          iconImage="/icons/refresh-2.svg"
        />
      </div>
      {/* Mobile  */}
      <div className="md:hidden  w-full max-w-3xl mx-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            <CarouselItem key={1}>
              <div className="grid grid-cols-2 gap-4">
                <OrderCard
                  title="Completed"
                  value="2541"
                  change={-5}
                  icon="completed"
                  variant="completed"
                  iconImage="/icons/task.svg"
                />

                <OrderCard
                  title="Processing"
                  value="556"
                  change={-12}
                  icon="processing"
                  variant="processing"
                  iconImage="/icons/rotate-left.svg"
                />
              </div>
            </CarouselItem>
            <CarouselItem key={2}>
              <div className="grid grid-cols-2 gap-4">
                <OrderCard
                  title="Waiting"
                  value="12100"
                  change={12}
                  icon="waiting"
                  variant="waiting"
                  iconImage="/icons/timer.svg"
                />

                <OrderCard
                  title="Returned"
                  value="12100"
                  change={+7}
                  icon="returned"
                  variant="returned"
                  iconImage="/icons/refresh-2.svg"
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
