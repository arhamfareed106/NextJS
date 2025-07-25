'use client';

import { UserNav } from '@/components/admin-panel/user-nav';
import { SheetMenu } from '@/components/admin-panel/sheet-menu';
import { UserNotifications } from '@/components/admin-panel/user-notifications';
import UserNavigationSearch from './user-nav-search';
import { AddProduct } from './user-nav-add-product';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface NavbarProps {
  title?: string;
}

const languages = [
  {
    code: 'de',
    name: 'Germany',
    flag: '/icons/flags/germany.svg',
  },
  {
    code: 'nl',
    name: 'Netherlands',
    flag: '/icons/flags/netherlands.svg',
  },
  {
    code: 'gb',
    name: 'United Kingdom',
    flag: '/icons/flags/uk.svg',
  },
];

export function Navbar({ title }: NavbarProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <header className="sticky top-0 z-10 w-full bg-container p-4 lg:p-0">
      <div className="pl-6 pr-5 py-0 lg:pl-0 lg:pr-6 lg:py-4 flex items-center gap-4 bg-background rounded-2xl lg:rounded-none">
        <div className="flex items-center gap-4 lg:gap-0 flex-1">
          <SheetMenu />
          {/*<h1 className="font-bold">{title} x </h1>*/}
          <div className="flex flex-1 items-center gap-4">
            <Button variant="none" size="icon" className="btn-icon w-max sm:hidden">
              <Image src="/icons/search-normal.svg" alt="Search" width={24} height={24} />
            </Button>
            {/* Search Bar */}
            <div className="hidden sm:block relative flex-1 max-w-[558px]">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-6">
                <Image
                  src="/icons/search-normal.svg"
                  alt="Search"
                  className="icon filter-secondary"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-16 pr-6 py-4 rounded-2xl bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-transparent"
              />
            </div>
            <AddProduct />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="none" size="icon" className="btn-icon  w-max">
                <Image src="/icons/translate.svg" alt="Translate" width={24} height={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => setSelectedLanguage(language)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Image
                    src={language.flag}
                    alt={`${language.name} flag`}
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                  <span className="text-sm">{language.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="none" size="icon" className="btn-icon  w-max  mr-2">
            <Image src="/icons/notification.svg" alt="Notifications" width={24} height={24} />
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
