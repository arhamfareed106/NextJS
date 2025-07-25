import Link from 'next/link';
import { MenuIcon, PanelsTopLeft } from 'lucide-react';
import { LogoName } from '@/components/admin-panel/logo-name';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/admin-panel/menu';
import { Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button variant="none" size="icon" className="btn-icon  w-max">
          <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
          {/* <MenuIcon size={20} /> */}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button className="flex justify-start pb-2 pt-1" variant="link" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <LogoName />
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
