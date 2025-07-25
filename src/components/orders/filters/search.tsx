// components/orders/filters/search.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react'; // Using Lucide React icon library
import { cn } from '@/lib/utils'; // Optional utility for merging classNames
import Image from 'next/image';

export function Search() {
  return (
    <div className="relative w-full max-w-sm">
      <Image
        width={18}
        height={18}
        src={'/icons/search-normal.svg'}
        alt=""
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
      />
      <Input placeholder="Search orders..." className={cn('pl-10 h-[37px]')} />
    </div>
  );
}
