"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  useCreatePickupOrderMutation,
  useGetCouriersQuery,
} from "@/lib/api/hooks";
import { CreatePickupOrderRequest } from "@/types";
import { ApiError } from "@/lib/api/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// DateTime Picker Component
function DateTimePicker({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  required = false,
  dateDisabled = false,
}: {
  label: string;
  date: Date | undefined;
  time: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  required?: boolean;
  dateDisabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-40 justify-between font-normal"
              disabled={dateDisabled}
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
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
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        type="time"
        step="1"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        required={required}
        className="w-32 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  );
}

export default function TestPage() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // Form state
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>("09:00:00");
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<string>("17:00:00");
  const [courier, setCourier] = useState<string>("");
  const [packageCount, setPackageCount] = useState<string>("");
  const [palletCount, setPalletCount] = useState<string>("");
  const [pickupComment, setPickupComment] = useState<string>("");
  const [isTwoManPickup, setIsTwoManPickup] = useState<boolean>(false);
  const [isHeavyPackage, setIsHeavyPackage] = useState<boolean>(false);

  const { data: couriers, isLoading: isLoadingCouriers } =
    useGetCouriersQuery();

  const { mutate: createPickupOrder, isPending } = useCreatePickupOrderMutation(
    {
      onSuccess: (data: any) => {
        console.log("Success:", data);
        setResponse(data);
        setError(null);
        toast.success("Pickup order created successfully!");
      },
      onError: (error: ApiError) => {
        console.error("Error:", error);
        setError(error);
        setResponse(null);
        toast.error("Failed to create pickup order");
      },
    }
  );

  // Helper function to format date and time to API format
  const formatDateTime = (date: Date | undefined, time: string): string => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}T${time}.000`;
  };

  // Update end date when start date changes
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    setEndDate(date); // Automatically set end date to match start date
  };

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

    // Validate required fields
    if (!startDate || !endDate || !courier || !packageCount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const startDateTime = formatDateTime(startDate, startTime);
    const endDateTime = formatDateTime(endDate, endTime);

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

    console.log("Start DateTime:", startDateTime);
    console.log("End DateTime:", endDateTime);

    const data: CreatePickupOrderRequest = {
      courier,
      start_time: startDateTime,
      end_time: endDateTime,
      package_count: parseInt(packageCount),
      pickup_comment: pickupComment,
      is_two_man_pickup: isTwoManPickup,
      is_heavy_package: isHeavyPackage,
      pallet_count: palletCount ? parseInt(palletCount) : undefined,
    };

    console.log("Submitting pickup order with data:", data);
    createPickupOrder(data);
  };

  // Test with hardcoded data
  const testApi = () => {
    const data: CreatePickupOrderRequest = {
      courier: "OMNIVA",
      start_time: "2026-03-30T20:18:00.000",
      end_time: "2026-03-30T20:19:00.000",
      package_count: 15,
      pickup_comment: "Test comment",
      is_two_man_pickup: true,
      is_heavy_package: true,
      pallet_count: 2,
    };

    console.log("Sending test data:", data);
    createPickupOrder(data);
  };

  const resetForm = () => {
    setStartDate(undefined);
    setStartTime("09:00:00");
    setEndDate(undefined);
    setEndTime("17:00:00");
    setCourier("");
    setPackageCount("");
    setPalletCount("");
    setPickupComment("");
    setIsTwoManPickup(false);
    setIsHeavyPackage(false);
    setResponse(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Test Pickup Order API</h1>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Test with Hardcoded Data</h2>
        <Button onClick={testApi} className="mb-4" disabled={isPending}>
          {isPending ? "Sending..." : "Test API Call"}
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Create Pickup Order</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courier">Courier *</Label>
              <Select
                value={courier}
                onValueChange={setCourier}
                required
                disabled={isLoadingCouriers}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a courier" />
                </SelectTrigger>
                <SelectContent>
                  {couriers?.map((courierOption: string) => (
                    <SelectItem key={courierOption} value={courierOption}>
                      {courierOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DateTimePicker
              label="Start Date & Time *"
              date={startDate}
              time={startTime}
              onDateChange={handleStartDateChange}
              onTimeChange={handleStartTimeChange}
              required
            />

            <TimePicker
              label="End Time *"
              time={endTime}
              onTimeChange={setEndTime}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="package_count">Package Count *</Label>
              <Input
                id="package_count"
                type="number"
                min="1"
                value={packageCount}
                onChange={(e) => setPackageCount(e.target.value)}
                placeholder="Enter number of packages"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pallet_count">Pallet Count</Label>
              <Input
                id="pallet_count"
                type="number"
                min="0"
                value={palletCount}
                onChange={(e) => setPalletCount(e.target.value)}
                placeholder="Enter number of pallets (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickup_comment">Pickup Comment</Label>
              <Input
                id="pickup_comment"
                value={pickupComment}
                onChange={(e) => setPickupComment(e.target.value)}
                placeholder="e.g. Come to gate 3, ring bell twice"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_two_man_pickup"
                  checked={isTwoManPickup}
                  onCheckedChange={(checked) => setIsTwoManPickup(!!checked)}
                />
                <Label htmlFor="is_two_man_pickup">
                  Two Man Pickup Required
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_heavy_package"
                  checked={isHeavyPackage}
                  onCheckedChange={(checked) => setIsHeavyPackage(!!checked)}
                />
                <Label htmlFor="is_heavy_package">Heavy Package</Label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={isPending || isLoadingCouriers}
                className="flex-1"
              >
                {isPending ? "Creating Order..." : "Create Pickup Order"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isPending}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>

      {response && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2 text-green-600">
            Success Response:
          </h2>
          <pre className="bg-green-50 p-4 rounded-lg overflow-auto text-sm border">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2 text-red-600">Error:</h2>
          <pre className="bg-red-50 p-4 rounded-lg overflow-auto text-sm border text-red-700">
            {error.message}
          </pre>
        </div>
      )}
    </div>
  );
}
