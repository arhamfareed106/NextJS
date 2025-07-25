"use client";

import OrderCard from "@/components/cards/OrderCard";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import EarningsCard from "../cards/BalanceCard";

export default function BalanceCarousel() {
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
      <div className="hidden md:grid md:grid-cols-3 gap-6 w-full">
        <EarningsCard
          title="Earning"
          iconName="TrendingUp"
          amount="112k"
          currency="€"
          percentage="12"
          timeframe="This week"
          iconBgColor="green"
        />

        <EarningsCard
          title="Balance"
          iconName="Wallet"
          amount="512.64"
          currency="€"
          percentage="-12"
          timeframe="This week"
          iconBgColor="purple"
        />

        <EarningsCard
          title="Total value of sales"
          iconName="ShoppingBag"
          amount="128k"
          currency="€"
          percentage="12"
          timeframe="This week"
          iconBgColor="blue"
        />
      </div>
      {/* Mobile  */}
      <div className="md:hidden  w-full max-w-3xl mx-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            <CarouselItem key={1}>
              <EarningsCard
                title="Earning"
                iconName="TrendingUp"
                amount="128k"
                currency="€"
                percentage="12"
                timeframe="This week"
                iconBgColor="green"
              />
            </CarouselItem>
            <CarouselItem key={2}>
              <EarningsCard
                title="Balance"
                iconName="Wallet"
                amount="512.64"
                currency="€"
                percentage="-12"
                timeframe="This week"
                iconBgColor="purple"
              />
            </CarouselItem>

            <CarouselItem key={3}>
              <EarningsCard
                title="Total value of sales"
                iconName="ShoppingBag"
                amount="128k"
                currency="€"
                percentage="12"
                timeframe="This week"
                iconBgColor="blue"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        {/* Dot Navigation */}
        <Separator className="py-primary-half" />
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 3 }).map((_, index) => (
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
