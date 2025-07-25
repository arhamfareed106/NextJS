import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type Product } from "@/lib/data/admin-products";

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({
  product,
  open,
  onOpenChange,
}: ProductDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Details of {product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-[auto,1fr] items-center gap-4">
            <Image
              src={product.image}
              alt={product.name}
              className="rounded-lg"
              width={60}
              height={60}
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <span className="text-muted-foreground">Category:</span>
              <span>{product.category}</span>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <span className="text-muted-foreground">SKU:</span>
              <span>{product.sku}</span>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <span className="text-muted-foreground">Barcode:</span>
              <span>{product.barcode}</span>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <span className="text-muted-foreground">QTY:</span>
              <span>{product.qty}</span>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <span className="text-muted-foreground">Top price:</span>
              <span>€{product.price}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit product</span>
            </Button>
            <Button size="icon" variant="outline">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete product</span>
            </Button>
          </div>
          <div className="grid gap-4">
            <h4 className="font-semibold">Sellers</h4>
            <div className="grid gap-4">
              {product.sellers.map((seller) => (
                <div
                  key={seller.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {seller.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">€{seller.price}</span>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
