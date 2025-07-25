"use client";

import { MapPin, Phone } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";

type Carrier = {
  id: string;
  name: string;
  logo: string;
  deliveryTime: string;
};

export default function CourierCall() {
  const [date, setDate] = useState<Date>();
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [addresses, setAddresses] = useState([
    "97616 Bad Neustadt, weimarer str. 11",
    "10115 Berlin, Torstraße 123",
    "80331 München, Marienplatz 8",
  ]);
  const [carriers, setCarriers] = useState<Carrier[]>([
    {
      id: "venipak",
      name: "Venipak",
      logo: "/mock/courier/venipak.png",
      deliveryTime: "1-3 working days",
    },
    {
      id: "hermes",
      name: "Hermes",
      logo: "/mock/courier/hermes.png",
      deliveryTime: "1-3 working days",
    },
    {
      id: "dhl",
      name: "DHL",
      logo: "/mock/courier/dhl.png",
      deliveryTime: "1-3 working days",
    },
    {
      id: "omniva",
      name: "Omniva",
      logo: "/mock/courier/omniva.png",
      deliveryTime: "1-3 working days",
    },
    {
      id: "tnt",
      name: "TNT",
      logo: "/mock/courier/tnt.png",
      deliveryTime: "1-3 working days",
    },
    {
      id: "gls",
      name: "GLS",
      logo: "/mock/courier/gls.png",
      deliveryTime: "1-3 working days",
    },
  ]);

  const handleAddAddress = () => {
    const newAddress = prompt("Enter new address:");
    if (newAddress) {
      setAddresses([...addresses, newAddress]);
    }
  };

  const handleCallCourier = () => {
    // Implement the logic to call a courier here
    console.log("Calling a courier...");
  };

  // Get the selected carrier's name
  const selectedCarrierName =
    carriers.find((carrier) => carrier.id === selectedCarrier)?.name || "";

  return (
    <div className="w-full py-4 space-y-4">
      <h2 className="text-xl font-semibold">Select delivery type</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date of invitation</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity of shipments</Label>
          <Input id="quantity" type="number" defaultValue="12" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Location</Label>
        <Select>
          <SelectTrigger id="address" className="w-full">
            <SelectValue placeholder="Select your address" />
          </SelectTrigger>
          <SelectContent>
            {addresses.map((address, index) => (
              <SelectItem key={index} value={address}>
                {address}
              </SelectItem>
            ))}
            <SelectItem value="new" className="text-primary">
              <Button
                variant="ghost"
                className="w-full justify-start p-0"
                onClick={handleAddAddress}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add new address
              </Button>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <RadioGroup
        value={selectedCarrier}
        onValueChange={setSelectedCarrier}
        className="grid md:grid-cols-6 grid-cols-2  gap-4"
      >
        {carriers.map((carrier) => (
          <Card key={carrier.id} className="cursor-pointer">
            <CardContent className="flex flex-col items-center justify-between p-4 h-full">
              <div className="flex-grow flex items-center justify-center mb-4">
                <Image
                  src={carrier.logo}
                  alt={carrier.name}
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Delivery average {carrier.deliveryTime}
                </p>
                <RadioGroupItem value={carrier.id} id={carrier.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
      <div className="flex justify-center">
        <Button
          className="md:w-1/2 w-full "
          onClick={handleCallCourier}
          disabled={!selectedCarrier} // Disable button if no carrier is selected
        >
          <Phone className="mr-2 h-4 w-4" />
          {selectedCarrier
            ? `Call ${selectedCarrierName} now`
            : "Select a courier"}
        </Button>
      </div>
    </div>
  );
}
