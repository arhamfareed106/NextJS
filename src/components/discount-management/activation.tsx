'use client';

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import PercentageDropdown from './PercentageDropdown';
import PriceDropdown from './PriceDropdown';
import DateDropdown from '../blocks/date-dropdown';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CategorySelector from './CategorySelector';

export const Activation = () => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
        {/* Name Field */}
        <div className="flex flex-col gap-[15px]">
          <span className="text-sm font-medium">Name</span>
          <Input placeholder="Name" type="text" className="h-[49px]" />
        </div>

        {/* Category Field */}
        {/* <CategorySelector /> */}
        <div className="flex flex-col gap-[15px]">
          <span className="text-sm font-medium">Percentage</span>
          <PercentageDropdown />
        </div>
        <div className="flex flex-col gap-[15px]">
          <span className="text-sm font-medium">Date</span>
          <DateDropdown />
        </div>
        <div className="flex flex-col gap-[15px]">
          <span className="text-sm font-medium">Price</span>
          <PriceDropdown />
        </div>
      </div>
      <Button type="submit" className="w-full max-w-[170px]">
        Price management
      </Button>
    </div>
  );
};
