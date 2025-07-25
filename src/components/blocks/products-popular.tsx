'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const products = [
  {
    name: 'Apple iPhone 13',
    itemNumber: '#FXZ-4567',
    price: '€999.29',
    image: '/mock/product1.png',
  },
  {
    name: 'Nike Air Jordan',
    itemNumber: '#FXZ-4567',
    price: '€10.29',
    image: '/mock/product2.png',
  },
  {
    name: 'Beats Studio 2',
    itemNumber: '#FXZ-4567',
    price: '€150.29',
    image: '/mock/product3.png',
  },
  {
    name: 'Apple Watch Series 7',
    itemNumber: '#FXZ-4567',
    price: '€5.29',
    image: '/mock/product4.png',
  },
  {
    name: 'Amazon Echo Dot',
    itemNumber: '#FXZ-4567',
    price: '€20.29',
    image: '/mock/product5.png',
  },
];

export default function Component() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Popular Products</CardTitle>
          <CardDescription>Total 10.4k Visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Image
                      alt={`${product.name} image`}
                      className="aspect-square rounded-md object-cover"
                      height="44"
                      src={product.image}
                      width="44"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.price}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsDialogOpen(true);
                          }}
                        >
                          View Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>{selectedProduct?.itemNumber}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 mt-4">
            {selectedProduct?.image && (
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                width={80}
                height={80}
                className="rounded-md"
              />
            )}
            <div>
              <p className="text-sm">
                Price: <strong>{selectedProduct?.price}</strong>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
