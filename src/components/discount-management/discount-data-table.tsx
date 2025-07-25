'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import Image from 'next/image';

const DiscountDataTable = () => {
  const products = [
    {
      id: 1,
      name: 'Nike',
      category: 'Shoes',
      percentage: '50',
      orders: 1022,
      price: '999.29',
    },
    {
      id: 2,
      name: 'Nike',
      category: 'Shoes',
      percentage: '50',
      orders: 1022,
      price: '999.29',
    },
    {
      id: 3,
      name: 'Nike',
      category: 'Shoes',
      percentage: '50',
      orders: 1022,
      price: '999.29',
    },
  ];

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(products.map((product) => product.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, productId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
      setSelectAll(false);
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="border-none">
          <TableRow className="bg-gray-50 border-none">
            <TableHead className=" rounded-l-[10px] px-2">
              <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} aria-label="Select all" />
            </TableHead>
            <TableHead className="font-medium text-[13px] px-2 text-gray-600">Name</TableHead>
            <TableHead className="font-medium text-[13px] px-2 text-gray-600">Percentage</TableHead>
            <TableHead className="font-medium text-[13px] px-2 text-gray-600">Orders</TableHead>
            <TableHead className="font-medium text-[13px] px-2  text-gray-600"></TableHead>
            <TableHead className="font-medium text-[13px] px-2 rounded-r-[10px] text-gray-600"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <TableCell className="py-[30px]">
                <Checkbox
                  checked={selectedItems.includes(product.id)}
                  onCheckedChange={(checked) => handleSelectItem(product.id, checked as boolean)}
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell className="py-[30px]">
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category}</div>
                </div>
              </TableCell>
              <TableCell className="py-[30px]">
                <span className="text-green-500 font-medium">%{product.percentage}</span>
              </TableCell>
              <TableCell className="py-[30px]">{product.orders}</TableCell>
              <TableCell className="py-[30px]">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <div className="text-sm text-gray-500">Current price with discount:</div>
                    <div className="font-medium text-gray-900">€{product.price}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-[30px]">
                <Image src={'/icons/edit-2.svg'} width={24} height={24} alt="" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DiscountDataTable;
