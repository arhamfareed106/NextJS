"use client";

import { useState } from "react";
import {
  useCreatePickupOrderMutation,
  useGetCouriersQuery,
} from "@/lib/api/hooks";
import { CreatePickupOrderRequest } from "@/types";
import { ApiError } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// DateTime Picker Component
function DateTimePicker({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  required = false,
}: {
  label: string;
  date: Date | undefined;
  time: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">{label}</Label>
      <div className="col-span-3 flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-40 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                onDateChange(selectedDate);
                setOpen(false);
              }}
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          step="1"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          required={required}
          className="w-32 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}

// Time Picker Component
function TimePicker({
  label,
  time,
  onTimeChange,
  required = false,
}: {
  label: string;
  time: string;
  onTimeChange: (time: string) => void;
  required?: boolean;
}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">{label}</Label>
      <Input
        type="time"
        step="1"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        required={required}
        className="col-span-3 w-32 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  );
}

export function CreatePickupOrderDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: couriers, isLoading: isLoadingCouriers } =
    useGetCouriersQuery();
  const { mutate: createPickupOrder, isPending } = useCreatePickupOrderMutation(
    {
      onSuccess: (data: any) => {
        console.log("Success:", data);
        toast.success("Pickup order created successfully");
        setOpen(false);
        // Invalidate and refetch pickup orders list
        queryClient.invalidateQueries({ queryKey: ["api", "getPickupOrders"] });
      },
      onError: (error: ApiError) => {
        console.error("Error:", error);
        setError(error);
        toast.error(error.message || "Failed to create pickup order");
      },
    }
  );

  const [error, setError] = useState<ApiError | null>(null);

  // Form state
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>("09:00:00");
  const [endTime, setEndTime] = useState<string>("17:00:00");

  // Update end time when start time changes
  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    // Calculate end time (1 hour later)
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const endDate = new Date();
    endDate.setHours(hours + 1, minutes, seconds);
    const endTimeStr = endDate.toTimeString().slice(0, 8);
    setEndTime(endTimeStr);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!startDate) {
      toast.error("Please select a start date");
      return;
    }

    // Format datetime strings
    const formatDateTime = (date: Date, time: string): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}T${time}.000`;
    };

    const startDateTime = formatDateTime(startDate, startTime);
    const endDateTime = formatDateTime(startDate, endTime);

    // Validate dates
    const startDateObj = new Date(startDateTime);
    const endDateObj = new Date(endDateTime);
    const now = new Date();

    if (startDateObj <= now) {
      toast.error("Start time must be in the future");
      return;
    }

    if (endDateObj <= startDateObj) {
      toast.error("End time must be after start time");
      return;
    }

    const data: CreatePickupOrderRequest = {
      courier: formData.get("courier") as string,
      start_time: startDateTime,
      end_time: endDateTime,
      package_count: parseInt(formData.get("package_count") as string),
      pickup_comment: (formData.get("pickup_comment") as string) || undefined,
      is_two_man_pickup: formData.get("is_two_man_pickup") === "on",
      is_heavy_package: formData.get("is_heavy_package") === "on",
      pallet_count: formData.get("pallet_count")
        ? parseInt(formData.get("pallet_count") as string)
        : undefined,
    };

    console.log("Submitting pickup order with data:", data);
    createPickupOrder(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Pickup Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Pickup Order</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new pickup order.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courier" className="text-right">
                Courier
              </Label>
              <Select name="courier" required disabled={isLoadingCouriers}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a courier" />
                </SelectTrigger>
                <SelectContent>
                  {couriers?.map((courier: string) => (
                    <SelectItem key={courier} value={courier}>
                      {courier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DateTimePicker
              label="Start Date & Time"
              date={startDate}
              time={startTime}
              onDateChange={setStartDate}
              onTimeChange={handleStartTimeChange}
              required
            />

            <TimePicker
              label="End Time"
              time={endTime}
              onTimeChange={setEndTime}
              required
            />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="package_count" className="text-right">
                Package Count
              </Label>
              <Input
                id="package_count"
                name="package_count"
                type="number"
                min="1"
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pallet_count" className="text-right">
                Pallet Count
              </Label>
              <Input
                id="pallet_count"
                name="pallet_count"
                type="number"
                min="0"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pickup_comment" className="text-right">
                Comment
              </Label>
              <Input
                id="pickup_comment"
                name="pickup_comment"
                placeholder="e.g. Come to gate 3"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-3 col-start-2 flex items-center space-x-2">
                <Checkbox id="is_two_man_pickup" name="is_two_man_pickup" />
                <Label htmlFor="is_two_man_pickup">Two Man Pickup</Label>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-3 col-start-2 flex items-center space-x-2">
                <Checkbox id="is_heavy_package" name="is_heavy_package" />
                <Label htmlFor="is_heavy_package">Heavy Package</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending || isLoadingCouriers}>
              {isPending ? "Creating..." : "Create Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
