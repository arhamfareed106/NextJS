// ./payout-dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Payout, PayoutStatus } from "@/types/payout";

interface PayoutDialogProps {
  payout: Payout | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PayoutDialog = ({
  payout,
  open,
  onOpenChange,
}: PayoutDialogProps) => {
  if (!payout) return null;

  const getStatusColor = (status: PayoutStatus) => {
    return status === "Paid"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payout Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>
                {payout.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{payout.name}</h4>
              <p className="text-sm text-gray-500">{payout.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge className={getStatusColor(payout.status)}>
                {payout.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="text-sm">€{payout.amount.toFixed(2)}</p>
            </div>
            {payout.paymentDate && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Payment Date
                </p>
                <p className="text-sm">{payout.paymentDate}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            {payout.status === "Pending" ? (
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Pay balance
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                Balance
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
