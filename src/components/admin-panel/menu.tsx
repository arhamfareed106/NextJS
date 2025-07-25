'use client';

import Link from 'next/link';
import { Ellipsis, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

import { cn } from '@/lib/utils';
import { getMenuList } from '@/lib/menu-list';
import type { Group, Menu as MenuType, Submenu } from '@/lib/menu-list';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CollapseMenuButton } from '@/components/admin-panel/collapse-menu-button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import PremiumCard from '../cards/PremiumCard';
import Image from 'next/image';

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  // Get user role from cookies
  const userData = Cookies.get('user');
  const user = userData ? JSON.parse(userData) : null;
  const isAdmin = user?.role && user.role.toLowerCase() === 'admin';

  // Filter menus and submenus based on adminOnly property
  const filteredMenuList = menuList
    .map((group) => {
      // Hide PREFERENCES group for admin users
      if (isAdmin && group.groupLabel === 'PREFERENCES') {
        return null;
      }

      const filteredMenus = group.menus
        .filter((menu) => (isAdmin ? menu.adminOnly : !menu.adminOnly))
        .map((menu) => ({
          ...menu,
          submenus: menu.submenus ? menu.submenus.filter((sub) => (isAdmin ? sub.adminOnly : !sub.adminOnly)) : [],
        }));

      // Only include groups that have visible menus
      if (filteredMenus.length === 0) {
        return null;
      }

      return {
        groupLabel: group.groupLabel,
        menus: filteredMenus,
      } as Group;
    })
    .filter((group): group is Group => group !== null); // Remove null groups and type guard

  return (
    <ScrollArea className="overflow-auto">
      <nav className="h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {filteredMenuList.map(({ groupLabel, menus }, index) => (
            <>
              <li className={cn('w-full', groupLabel ? '' : '')} key={index}>
                {(isOpen && groupLabel) || isOpen === undefined ? (
                  <p className="text-sm font-medium text-muted-foreground px-4 pb-3 max-w-[248px] truncate">
                    {groupLabel}
                  </p>
                ) : !isOpen && isOpen !== undefined && groupLabel ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="w-full flex justify-center items-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{groupLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="pb-2"></p>
                )}
                {menus.map(({ href, label, icon, active, submenus }: MenuType, index: number) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Link
                              href={href}
                              className={cn(
                                'nav-item w-full justify-start mb-1 flex items-center gap-5',
                                (active === undefined && pathname.startsWith(href)) || active ? 'active' : '',
                              )}
                            >
                              <div className="flex items-center gap-[14px] flex-1 px-2 py-4 nav-item-content rounded-2xl">
                                <span className={cn(isOpen === false ? '' : '')}>
                                  <Image src={icon} alt={label} width={24} height={24} />
                                </span>
                                <p
                                  className={cn(
                                    'max-w-[200px] truncate',
                                    isOpen === false ? '-translate-x-96 opacity-0' : 'translate-x-0 opacity-100',
                                  )}
                                >
                                  {label}
                                </p>
                              </div>
                              <div className="w-[5px] h-9 rounded-[5px] bg-primary nav-item-bar"></div>
                            </Link>
                          </TooltipTrigger>
                          {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={icon}
                        label={label}
                        active={active === undefined ? pathname.startsWith(href) : active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  ),
                )}
              </li>
              {index < filteredMenuList.length - 1 && (
                <li className="w-full pt-2 pb-6">
                  <div className="w-full h-[1px] bg-border"></div>
                </li>
              )}
            </>
          ))}
          {/*
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => { }}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        !isOpen ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
          */}
          {/* <li className="w-full grow flex items-end">
            <PremiumCard
              className={!isOpen ? "hidden" : "block"}
              title="Premium Services"
              description="Learn how to provide exceptional customer support and build loyalty."
              buttonText="Upgrade to Premium"
            />
          </li> */}
        </ul>
      </nav>
    </ScrollArea>
  );
}
