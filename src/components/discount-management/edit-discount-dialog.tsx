// components/discount-management/edit-discount-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DiscountForm } from "./discount-form";
import { PriceAdjustment } from "@/types";

interface EditDiscountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  discount?: PriceAdjustment;
}

export function EditDiscountDialog({
  open,
  onOpenChange,
  discount,
}: EditDiscountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit discount</DialogTitle>
        </DialogHeader>
        <DiscountForm initialData={discount} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
