// components/StatisticsCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import StatisticsCard from "@/components/cards/AdminOrderUser";
import { Separator } from "@/components/ui/separator";

interface StatisticsCarouselProps {
  statistics: {
    title: string;
    value: string | number;
    icon: string;
    iconBgColor: string;
    currency?: string;
    subtitle?: string;
  }[];
}

export default function StatisticsCarousel({
  statistics,
}: StatisticsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <>
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden w-full max-w-3xl mx-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            {statistics.map((stat, index) => (
              <CarouselItem key={index}>
                <StatisticsCard {...stat} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Separator className="my-4" />

        <div className="flex justify-center space-x-2">
          {statistics.map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                current === index ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
