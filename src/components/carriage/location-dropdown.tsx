'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LocationDropdown() {
  const [selectedAddress, setSelectedAddress] = useState('97616 Bad Neustadt, weimarer str. 11');

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="border border-border-2 rounded-[15px] flex justify-between">
            <div className="px-4 py-4 flex flex-col gap-1">
              <span className="text-gray-10 text-xs font-medium">Location</span>
              <h2 className="text-foreground text-sm font-medium">{selectedAddress || 'Select your address'}</h2>
            </div>
            <div className="px-5 border-l border-border-2 flex justify-center items-center">
              <Image src={'/icons/Group 524.svg'} width={27} height={27} alt="" className="cursor-pointer" />
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)] shadow2 rounded-[25px] p-0"
          align="start"
        >
          <div className="p-4 w-full">
            <DropdownMenuItem
              className="px-4 py-5 bg-container cursor-pointer hover:bg-gray-50 rounded-lg"
              onClick={() => setSelectedAddress('97616 Bad Neustadt, weimarer str. 11')}
            >
              <div className="flex flex-col items-start gap-1 w-full">
                <span className="text-gray-10 text-xs font-medium">Address you added</span>
                <span className="text-sm text-foreground font-medium">97616 Bad Neustadt, weimarer str. 11</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="p-3 mt-2">
              <div className="flex items-center justify-center gap-2.5 w-full">
                <Image src={'/icons/location-add.svg'} width={18} height={18} alt="" />
                <span className="text-sm font-medium text-foreground">Add new address</span>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
