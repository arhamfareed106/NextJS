'use client';
import { DollarSign } from 'lucide-react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { BadgeCard } from '../ui/badge-card';
// JSON data extracted for card content
const cardData = [
  {
    title: 'Revenue',
    badgeText: '↓ 12%',
    badgeVariant: 'regress',
    amount: '$45,231.89',
    changeText: '-20.1% from last month',
  },
  {
    title: 'Orders',
    badgeText: '↑ 8%',
    badgeVariant: 'success',
    amount: '1,231',
    changeText: '+15% from last month',
  },
  {
    title: 'Returns',
    badgeText: '↓ 3%',
    badgeVariant: 'regress',
    amount: '4,512',
    changeText: '-2.3% from last month',
  },
];

interface CardComponentProps {
  className?: string;
  title: string;
  badgeText: string;
  badgeVariant: BadgeProps['variant'];
  amount: string | number;
  changeText: string;
}

// Card component to render individual card
const CardComponent: React.FC<CardComponentProps> = ({
  className,
  title,
  badgeText,
  badgeVariant,
  amount,
  changeText,
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <BadgeCard variant={badgeVariant}>{badgeText}</BadgeCard>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <div className="text-2xl font-bold">{amount}</div>
      <p className="text-xs text-muted-foreground">{changeText}</p>
      <p>
        <a className="text-xs font-bold text-primary flex items-center gap-1" href="#">
          More
          <Image src={'/icons/arrow-right.png'} alt="arrow-right" width={18} height={18} />
        </a>
      </p>
    </CardContent>
  </Card>
);

// CardStack component that maps over the JSON data to render multiple cards
export default function CardStack() {
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
      {/* Desktop  */}
      <div className="hidden md:flex md:flex-row flex-col gap-primary">
        {cardData.map((card, index) => (
          <CardComponent
            className="basis-1/3"
            key={index}
            title={card.title}
            badgeText={card.badgeText}
            badgeVariant={card.badgeVariant as BadgeProps['variant']}
            amount={card.amount}
            changeText={card.changeText}
          />
        ))}
      </div>

      {/* Mobile  */}
      <div className="md:hidden w-full max-w-3xl mx-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            {cardData.map((card, index) => (
              <CarouselItem key={index}>
                <CardComponent
                  className="basis-1/3"
                  key={index}
                  title={card.title}
                  badgeText={card.badgeText}
                  badgeVariant={card.badgeVariant as BadgeProps['variant']}
                  amount={card.amount}
                  changeText={card.changeText}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Dot Navigation */}
        <Separator className="py-primary-half" />
        <div className="flex justify-center space-x-2">
          {cardData.map((_, index) => (
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
