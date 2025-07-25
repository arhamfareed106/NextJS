import { Button } from '@/components/ui/button';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash } from 'lucide-react'; // Import the relevant icons
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

const RecentOrders = () => {
  const recentOrders = [
    {
      barcode: '#FXZ-4567',
      date: 'Apr 15, 2023, 10:21',
      product: {
        name: 'Apple iPhone 13',
        quantity: '1 Pcs',
        size: 'Size M',
      },
      status: 'Success',
      badgeVariant: 'success',
      amount: '€999.29',
    },
    {
      barcode: '#FXZ-1234',
      date: 'Apr 12, 2023, 14:10',
      product: {
        name: 'Nike Air Jordan',
        quantity: '1 Pcs',
        size: 'Size M',
      },
      status: 'Pending',
      badgeVariant: 'pending',
      amount: '€10.29',
    },
    {
      barcode: '#FXZ-7890',
      date: 'Apr 10, 2023, 11:05',
      product: {
        name: 'Beats Studio 2',
        quantity: '1 Pcs',
        size: 'Size L',
      },
      status: 'Success',
      badgeVariant: 'success',
      amount: '€150.29',
    },
    {
      barcode: '#FXZ-5678',
      date: 'Apr 9, 2023, 16:45',
      product: {
        name: 'Apple Watch Series 7',
        quantity: '1 Pcs',
        size: 'Size S',
      },
      status: 'Failed',
      badgeVariant: 'regress',
      amount: '€5.29',
    },
    {
      barcode: '#FXZ-3456',
      date: 'Apr 5, 2023, 09:30',
      product: {
        name: 'Amazon Echo Dot',
        quantity: '1 Pcs',
        size: 'Size M',
      },
      status: 'Success',
      badgeVariant: 'success',
      amount: '€20.29',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead className=" rounded-l-[10px] hidden md:table-cell px-5 py-2 text-muted-foreground">
                Barcode
              </TableHead>
              <TableHead className="hidden md:table-cell px-5 py-2 text-muted-foreground">Date</TableHead>
              <TableHead className="px-5 py-2 text-muted-foreground">Product</TableHead>
              <TableHead className="px-5 py-2 text-muted-foreground">Status</TableHead>
              <TableHead className="hidden md:table-cell px-5 py-2 text-muted-foreground">Amount</TableHead>
              <TableHead className="hidden rounded-r-[10px] md:table-cell px-5 py-2 text-muted-foreground">
                Actions
              </TableHead>
              <TableHead className="rounded-r-[10px] md:hidden px-5 py-2 text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell className="hidden md:table-cell p-5">{order.barcode}</TableCell>
                <TableCell className="hidden md:table-cell p-5">{order.date}</TableCell>
                <TableCell className="p-5">
                  <span className="font-bold">{order.product.name}</span>
                  <br />
                  <span className="text-xs text-slate-500">
                    {order.product.quantity} &middot; {order.product.size}
                  </span>
                </TableCell>
                <TableCell className="p-5">
                  <Badge variant={order.badgeVariant as BadgeProps['variant']}>{order.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell p-5">{order.amount}</TableCell>
                <TableCell className="hidden md:table-cell p-5">
                  <div className="flex gap-4">
                    <Button variant="ghost" size="icon">
                      <Image src={'/icons/eye.svg'} alt="eye" width={24} height={24} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image src={'/icons/edit-2.svg'} alt="edit" width={24} height={24} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image src={'/icons/bag-cross.svg'} alt="delete" width={24} height={24} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="md:hidden p-5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
