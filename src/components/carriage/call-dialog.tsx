import CourierCall from '@/app/(demo)/carriage/call/courier-call';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CalendarIcon, Phone, PlusIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import LocationDropdown from './location-dropdown';

type Carrier = {
  id: string;
  name: string;
  logo: string;
  deliveryTime: string;
};

export function CallDialog() {
  const [date, setDate] = useState<Date>();
  const [selectedCarrier, setSelectedCarrier] = useState('');
  const [addresses, setAddresses] = useState([
    '97616 Bad Neustadt, weimarer str. 11',
    '10115 Berlin, Torstraße 123',
    '80331 München, Marienplatz 8',
  ]);
  const [carriers, setCarriers] = useState<Carrier[]>([
    {
      id: 'ups',
      name: 'Ups',
      logo: '/mock/courier/ups.svg',
      deliveryTime: '1-3 working days',
    },
    {
      id: 'dpd',
      name: 'Dpd',
      logo: '/mock/courier/dpd.svg',
      deliveryTime: '1-3 working days',
    },
    {
      id: 'lietuvos',
      name: 'Lietuvos Pastas',
      logo: '/mock/courier/lp.svg',
      deliveryTime: '1-3 working days',
    },
    {
      id: 'fedex',
      name: 'Fedex',
      logo: '/mock/courier/fedex.svg',
      deliveryTime: '1-3 working days',
    },
    {
      id: 'dhl',
      name: 'Dhl',
      logo: '/mock/courier/dhl.svg',
      deliveryTime: '1-3 working days',
    },
    {
      id: 'omniva',
      name: 'Omniva',
      logo: '/mock/courier/omniva.svg',
      deliveryTime: '1-3 working days',
    },
    {
      id: 'itella',
      name: 'Itella',
      logo: '/mock/courier/itella.svg',
      deliveryTime: '1-3 working days',
    },
    {
      id: 'hermes',
      name: 'Hermes',
      logo: '/mock/courier/hermes.svg',
      deliveryTime: '1-3 working days',
    },

    {
      id: 'gls',
      name: 'Gls',
      logo: '/mock/courier/gls.svg',
      deliveryTime: '1-3 working days',
    },

    {
      id: 'tnt',
      name: 'Tnt',
      logo: '/mock/courier/tnt.svg',
      deliveryTime: '1-3 working days',
    },

    {
      id: 'venipak',
      name: 'Venipak',
      logo: '/mock/courier/venipack.svg',
      deliveryTime: '1-3 working days',
    },
  ]);

  const handleAddAddress = () => {
    const newAddress = prompt('Enter new address:');
    if (newAddress) {
      setAddresses([...addresses, newAddress]);
    }
  };

  const handleCallCourier = () => {
    // Implement the logic to call a courier here
    console.log('Calling a courier...');
  };

  // Get the selected carrier's name
  const selectedCarrierName = carriers.find((carrier) => carrier.id === selectedCarrier)?.name || '';

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-white text-foreground hover:bg-white/90 h-[49px] w-[156px]" size="lg">
            Call
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[627px] h-[500px] overflow-y-auto scrollbar-hide ">
          <DialogHeader>
            <DialogTitle>Select delivery type</DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col gap-[30px] pt-4">
            <div className="grid grid-cols-2 gap-[30px]">
              <div className="space-y-2">
                <Label htmlFor="date">Date of invitation</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        'w-full justify-between h-[49px] text-left font-normal',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      {date ? format(date, 'PPP') : 'Select date'}
                      <Image src={'/icons/calendar-add.svg'} width={24} height={24} alt="calendar" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity of shipments</Label>
                <Input id="quantity" type="number" className="h-[49px]" defaultValue="12" />
              </div>
            </div>
            <div className="relative">
              <LocationDropdown />
            </div>
            <RadioGroup
              value={selectedCarrier}
              onValueChange={setSelectedCarrier}
              className="grid md:grid-cols-4 grid-cols-2  gap-4"
            >
              {carriers.map((carrier) => (
                <Card key={carrier.id} className="cursor-pointer shadow-none bg-transparent">
                  <CardContent className="flex flex-col shadow-none bg-transparent items-center justify-between p-4 h-full">
                    <div className="flex-grow max-w-[113px] w-full shadow-md bg-white rounded-[15px] flex items-center justify-center mb-4">
                      <Image
                        src={carrier.logo}
                        alt={carrier.name}
                        width={1000}
                        height={1000}
                        className="max-w-full h-auto w-full object-contain"
                      />
                    </div>
                    <div className="text-center flex flex-col gap-5 items-center">
                      <div className="flex flex-col items-center">
                        <p className="text-xs font-medium text-muted-foreground ">
                          Delivery average {carrier.deliveryTime}
                        </p>
                      </div>
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
                {selectedCarrier ? `Call ${selectedCarrierName} now` : 'Select a courier'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
