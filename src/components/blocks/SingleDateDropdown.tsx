'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import Image from 'next/image';

interface SingleDateDropdownProps {
  onChange?: (formatted: string) => void;
}

export default function SingleDateDropdown({ onChange }: SingleDateDropdownProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'Pick a date';

  useEffect(() => {
    if (selectedDate && onChange) {
      onChange(format(selectedDate, 'yyyy-MM-dd'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="max-w-[200px] w-full justify-between rounded-[12px] text-left font-normal">
          {formattedDate}
          <Image src="/icons/arrow-down.svg" width={14} height={14} alt="arrow" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
