'use client';

import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface RawProduct {
  quantity: number;
  product_price: number;
  total_price: number;
  product: {
    title: string;
    modification_title: string;
    category: string;
    sku: string;
    ean: string;
    image_url: string[];
  };
}

interface ProductTableProps {
  products: RawProduct[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-none">
              <TableHead className="w-[50px] rounded-l-[10px]">
                <Checkbox />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">QTY</TableHead>
              <TableHead className="text-right rounded-r-[10px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="pl-4">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2 overflow-x-auto max-w-[180px]">
                      {item.product.image_url.map((url, idx) => (
                        // eslint-disable-next-line react/jsx-key
                        <Image
                          src={url}
                          alt={`Image ${idx + 1}`}
                          width={60}
                          height={60}
                          unoptimized
                          className="rounded-md object-contain flex-shrink-0"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-sm text-muted-foreground">Storage: {item.product.modification_title}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">€{item.product_price.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold">{item.quantity}</TableCell>
                <TableCell className="text-right font-semibold">
                  €{(item.quantity * item.product_price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {products.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">#{index + 1}</span>
              <span className="text-sm text-muted-foreground">Product</span>
            </div>

            <div className="flex gap-2 overflow-x-auto mb-4">
              {item.product.image_url.map((url, idx) => (
                <Image
                  key={idx}
                  src={url || '/placeholder.svg'}
                  alt={item.product.title}
                  width={50}
                  height={50}
                  className="rounded-md object-contain flex-shrink-0"
                />
              ))}
            </div>

            <p className="font-medium text-sm">{item.product.title}</p>
            <p className="text-xs text-muted-foreground mb-2">{item.product.modification_title}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold">€{item.product_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">QTY</span>
                <span className="font-semibold">{item.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold">€{(item.quantity * item.product_price).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SKU</span>
                <span className="font-semibold">{item.product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">EAN</span>
                <span className="font-semibold">{item.product.ean || '-'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
