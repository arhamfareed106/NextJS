"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditDialog } from "./edit-dialog";
// import , { payments, type Payment } from "@/lib/data/payments"
import generateMockupPaymentData, { Payment } from "@/lib/data/payments";
const payments = generateMockupPaymentData(10);
export function PaymentsTable() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Search order..." className="w-[300px]" />
        </div>
        <Select defaultValue="10">
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">
                Applicable to
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Commission price
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Logistics cost
              </TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow
                key={payment.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedPayment(payment);
                  setDialogOpen(true);
                }}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>{payment.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div>
                    <div className="font-medium">{payment.category}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.subcategory}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  €{payment.commissionPrice}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  €{payment.logisticsCost}
                </TableCell>
                <TableCell>€{payment.price}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPayment(payment);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Displaying 1 to 10 of 100 entries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
      <EditDialog
        payment={selectedPayment}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
