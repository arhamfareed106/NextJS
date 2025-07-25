'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { CallDialog } from './carriage/call-dialog';

export function CourierInterface() {
  return (
    <div className="w-full  h-full">
      <div className="relative overflow-hidden h-full rounded-[25px] p-6  ">
        {' '}
        {/* Set height */}
        {/* Background Image */}
        <Image src="/Untitled.png" alt="" fill className="object-cover z-0" />
        {/* Content */}
        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Call a courier</h2>
          <Separator />
          {/* <Link href="/carriage/call"> */}
          <CallDialog />
          {/* </Link> */}
        </div>
      </div>

      {/* Secondary Button */}
      {/* <div>
        <Link href="/carriage/send">
          <Button variant="secondary" className="w-full h-[49px] bg-gray-150 text-white hover:bg-gray-800" size="lg">
            Send without order
          </Button>
        </Link>
      </div> */}
    </div>
  );
}
