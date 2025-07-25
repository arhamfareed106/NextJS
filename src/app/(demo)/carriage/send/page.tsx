"use client";

import { useState } from "react";
import { Calendar, CalendarIcon } from "lucide-react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Heading } from "@/components/wrappers/heading";
import { Separator } from "@radix-ui/react-dropdown-menu";

const formSchema = z.object({
  sender: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    street: z.string().min(5),
    postcode: z.string().min(4),
    city: z.string().min(2),
    country: z.string().min(2),
  }),
  receiver: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    street: z.string().min(5),
    postcode: z.string().min(4),
    city: z.string().min(2),
    country: z.string().min(2),
  }),
  package: z.object({
    type: z.enum(["palette", "package"]),
    weight: z.string().min(1),
    length: z.string().min(1),
    width: z.string().min(1),
    height: z.string().min(1),
  }),
  delivery: z.object({
    date: z.string(),
    quantity: z.string().min(1),
    courier: z.string(),
  }),
});

const couriers = [
  {
    name: "GLS",
    logo: "/mock/courier/gls.png",
    deliveryDays: "1-3",
    price: 6.13,
  },
  {
    name: "Hermas",
    logo: "/mock/courier/hermes.png",
    deliveryDays: "1-3",
    price: 4.02,
  },
  {
    name: "Omniva",
    logo: "/mock/courier/omniva.png",
    deliveryDays: "1-3",
    price: 3.78,
  },
  {
    name: "DHL",
    logo: "/mock/courier/dhl.png",
    deliveryDays: "1-3",
    price: 3.99,
  },
  {
    name: "DPD",
    logo: "/mock/courier/dpd.png",
    deliveryDays: "1-3",
    price: 9.55,
  },
  {
    name: "Lietuvos paštas",
    logo: "/mock/courier/lp.png",
    deliveryDays: "1-3",
    price: 6.22,
  },
  {
    name: "FedEx",
    logo: "/mock/courier/fedex.png",
    deliveryDays: "1-3",
    price: 4.14,
  },
  {
    name: "UPS",
    logo: "/mock/courier/ups.png",
    deliveryDays: "1-3",
    price: 5.22,
  },
];

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Carriage", href: "/carriage" },
  { label: "Send Without Order", href: "/carriage/send" },
];

export default function Component() {
  const [date, setDate] = useState<Date>();
  const [totalPrice, setTotalPrice] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sender: {
        firstName: "",
        lastName: "",
        street: "",
        postcode: "",
        city: "",
        country: "",
      },
      receiver: {
        firstName: "",
        lastName: "",
        street: "",
        postcode: "",
        city: "",
        country: "",
      },
      package: {
        type: "package",
        weight: "",
        length: "",
        width: "",
        height: "",
      },
      delivery: {
        date: "",
        quantity: "1",
        courier: "",
      },
    },
  });

  function calculatePrice(data: z.infer<typeof formSchema>) {
    const courier = couriers.find((c) => c.name === data.delivery.quantity);
    const basePrice = courier?.price || 6.22;
    const quantity = parseInt(data.delivery.quantity);
    const weight = parseInt(data.package.weight);

    // Basic price calculation formula
    let price = basePrice * quantity;
    if (weight > 10) {
      price += (weight - 10) * 0.5; // Extra charge for weight over 10kg
    }

    setTotalPrice(price);
    return price;
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    calculatePrice(data);
  }

  return (
    <ContentLayout title={`Send Without Order`}>
      <Breadcrumbs items={breadcrumbItems} />
      <Separator className="py-2" />
      <Heading
        level="h3"
        heading="Send Without Order"
        subheading="Fill the form, and the package price will be calculated for you."
      />
      <Separator className="py-2" />
      <div className=" mx-auto space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sender Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Sender</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="sender.firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sender.lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="sender.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street and house number</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="sender.postcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postcode</FormLabel>
                            <FormControl>
                              <Input placeholder="Postcode" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sender.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="sender.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Receiver Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Receiver</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="receiver.firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiver.lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="receiver.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street and house number</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="receiver.postcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postcode</FormLabel>
                            <FormControl>
                              <Input placeholder="Postcode" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiver.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="receiver.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Package Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Package Details</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="package.type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="palette" id="palette" />
                              <label htmlFor="palette">Palette</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="package" id="package" />
                              <label htmlFor="package">Package</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="package.weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Weight"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="package.length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length (m)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Length"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="package.width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (m)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Width"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="package.height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (m)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Height"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
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
                    <FormField
                      control={form.control}
                      name="delivery.quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Quantity"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="delivery.courier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Courier</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              const selectedCourier = couriers.find(
                                (c) => c.name === value
                              );
                              const quantity =
                                parseInt(form.getValues("delivery.quantity")) ||
                                1;
                              const weight =
                                parseInt(form.getValues("package.weight")) || 0;

                              // Calculate price
                              let price =
                                (selectedCourier?.price || 6.22) * quantity;
                              if (weight > 10) {
                                price += (weight - 10) * 0.5;
                              }

                              setTotalPrice(price);
                            }}
                            defaultValue={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                          >
                            {couriers.map((courier) => (
                              <div
                                key={courier.name}
                                className="relative flex flex-col items-center border rounded-lg p-4 cursor-pointer hover:bg-gray-50 [&:has(:checked)]:bg-gray-50 [&:has(:checked)]:border-primary"
                              >
                                <RadioGroupItem
                                  value={courier.name}
                                  id={courier.name}
                                  className="absolute right-2 top-2"
                                />
                                <Image
                                  src={courier.logo}
                                  alt={courier.name}
                                  width={100}
                                  height={60}
                                  className="mb-2"
                                />
                                <div className="text-sm text-center">
                                  <div>
                                    Delivery average {courier.deliveryDays}
                                  </div>
                                  <div>working days</div>
                                  <div className="font-bold text-primary">
                                    €{courier.price.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-2xl font-bold text-center">
                Calculated Price: €{totalPrice.toFixed(2)}
              </div>
              <div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!form.watch("delivery.courier")}
                >
                  {form.watch("delivery.courier")
                    ? `Call ${form.watch("delivery.courier")}`
                    : "Select a courier"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
}
