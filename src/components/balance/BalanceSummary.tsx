import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetBalanceSummaryQuery } from '@/lib/api/hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';
import { Separator } from '../ui/separator';

export default function BalanceSummary() {
  const { data: summaryData, isLoading, error } = useGetBalanceSummaryQuery();
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
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">€0.00</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg mb-6">
        <p className="text-red-800">Error loading summary data: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="flex flex-col py-[30px] gap-[30px]">
            <div className="w-[45px] h-[45px] bg-status-completed rounded-full flex justify-center items-center ">
              <Image src={'/icons/activity.svg'} width={24} height={24} alt="" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2.5">
                <h2 className="text-base font-bold text-muted-foreground">Earning</h2>
                <p className="text-2xl font-bold">€{summaryData?.earnings || '0.00'}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Image src={'/icons/Vector.svg'} width={1000} height={1000} className="max-w-[139px] h-auto" alt="" />
                <div className="flex justify-end items-center gap-1.5">
                  <span className="flex items-center text-green-100 text-xs font-medium">
                    <Image src={'/icons/arrow-up-green.svg'} width={14} height={14} alt="" />
                    12%
                  </span>
                  <span className="text-muted-foreground text-xs font-bold">This week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col py-[30px] gap-[30px]">
            <div className="w-[45px] h-[45px] bg-status-processing rounded-full flex justify-center items-center ">
              <Image src={'/icons/graph.svg'} width={24} height={24} alt="" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2.5">
                <h2 className="text-base font-bold text-muted-foreground">Balance</h2>
                <p className="text-2xl font-bold">€{summaryData?.balance || '0.00'}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Image
                  src={'/icons/red-graph.svg'}
                  width={1000}
                  height={1000}
                  className="max-w-[139px] h-auto"
                  alt=""
                />
                <div className="flex justify-end items-center gap-1.5">
                  <span className="flex items-center text-red-50 text-xs font-medium">
                    <Image src={'/icons/arrow-up-red.svg'} width={14} height={14} alt="" />
                    12%
                  </span>
                  <span className="text-muted-foreground text-xs font-bold">This week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col py-[30px] gap-[30px]">
            <div className="w-[45px] h-[45px] bg-status-waiting rounded-full flex justify-center items-center ">
              <Image src={'/icons/bag-2.svg'} width={24} height={24} alt="" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2.5">
                <h2 className="text-base font-bold text-muted-foreground">Total value of sales</h2>
                <p className="text-2xl font-bold">€{summaryData?.total_sales || '0.00'}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Image src={'/icons/Vector.svg'} width={1000} height={1000} className="max-w-[139px] h-auto" alt="" />
                <div className="flex justify-end items-center gap-1.5">
                  <span className="flex items-center text-green-100 text-xs font-medium">
                    <Image src={'/icons/arrow-up-green.svg'} width={14} height={14} alt="" />
                    12%
                  </span>
                  <span className="text-muted-foreground text-xs font-bold">This week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:hidden  w-full max-w-3xl mx-auto">
        <Carousel setApi={setApi} className="relative">
          <CarouselContent>
            <CarouselItem key={1}>
              <div className="">
                <Card>
                  <CardContent className="flex flex-col py-[30px] gap-[30px]">
                    <div className="w-[45px] h-[45px] bg-status-completed rounded-full flex justify-center items-center ">
                      <Image src={'/icons/activity.svg'} width={24} height={24} alt="" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-2.5">
                        <h2 className="text-base font-bold text-muted-foreground">Earning</h2>
                        <p className="text-2xl font-bold">€{summaryData?.earnings || '0.00'}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Image
                          src={'/icons/Vector.svg'}
                          width={1000}
                          height={1000}
                          className="max-w-[139px] h-auto"
                          alt=""
                        />
                        <div className="flex justify-end items-center gap-1.5">
                          <span className="flex items-center text-green-100 text-xs font-medium">
                            <Image src={'/icons/arrow-up-green.svg'} width={14} height={14} alt="" />
                            12%
                          </span>
                          <span className="text-muted-foreground text-xs font-bold">This week</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem key={2}>
              <div className=" ">
                <Card>
                  <CardContent className="flex flex-col py-[30px] gap-[30px]">
                    <div className="w-[45px] h-[45px] bg-status-processing rounded-full flex justify-center items-center ">
                      <Image src={'/icons/graph.svg'} width={24} height={24} alt="" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-2.5">
                        <h2 className="text-base font-bold text-muted-foreground">Balance</h2>
                        <p className="text-2xl font-bold">€{summaryData?.balance || '0.00'}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Image
                          src={'/icons/red-graph.svg'}
                          width={1000}
                          height={1000}
                          className="max-w-[139px] h-auto"
                          alt=""
                        />
                        <div className="flex justify-end items-center gap-1.5">
                          <span className="flex items-center text-red-50 text-xs font-medium">
                            <Image src={'/icons/arrow-up-red.svg'} width={14} height={14} alt="" />
                            12%
                          </span>
                          <span className="text-muted-foreground text-xs font-bold">This week</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem key={3}>
              <div className=" ">
                <Card>
                  <CardContent className="flex flex-col py-[30px] gap-[30px]">
                    <div className="w-[45px] h-[45px] bg-status-waiting rounded-full flex justify-center items-center ">
                      <Image src={'/icons/bag-2.svg'} width={24} height={24} alt="" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-2.5">
                        <h2 className="text-base font-bold text-muted-foreground">Total value of sales</h2>
                        <p className="text-2xl font-bold">€{summaryData?.total_sales || '0.00'}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Image
                          src={'/icons/Vector.svg'}
                          width={1000}
                          height={1000}
                          className="max-w-[139px] h-auto"
                          alt=""
                        />
                        <div className="flex justify-end items-center gap-1.5">
                          <span className="flex items-center text-green-100 text-xs font-medium">
                            <Image src={'/icons/arrow-up-green.svg'} width={14} height={14} alt="" />
                            12%
                          </span>
                          <span className="text-muted-foreground text-xs font-bold">This week</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
              className={`w-2 h-2 rounded-full transition-colors ${current === index ? 'bg-primary' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
