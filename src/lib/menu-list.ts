import { LucideIcon } from "lucide-react";

import {
  Tag,
  Users,
  Bookmark,
  SquarePen,
  LayoutGrid,
  Box,
  MessageCircleQuestion,
  Lock,
  CreditCard,
  Truck,
  Receipt,
  Settings,
  Shield,
} from "lucide-react";

export type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  adminOnly?: boolean;
};

export type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: string;
  submenus?: Submenu[];
  adminOnly?: boolean;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "MENU",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: "/icons/grid-3.svg",
          submenus: [],
        },
        {
          href: "",
          label: "Products",
          icon: "/icons/box.svg",
          submenus: [
            {
              href: "/products",
              label: "Product list",
            },
            {
              href: "/products/new",
              label: "Add Product",
            },
            {
              href: "/products/categories",
              label: "Category List",
            },
          ],
        },
        {
          href: "/orders",
          label: "Orders",
          icon: "/icons/bag-2.svg",
          submenus: [
            {
              href: "/orders",
              label: "Orders list",
            },
          ],
        },
        {
          href: "/balance",
          label: "Balance",
          icon: "/icons/empty-wallet.svg",
          submenus: [],
        },
        {
          href: "/carriage",
          label: "Carriage",
          icon: "/icons/truck-fast.svg",
          submenus: [],
        },
        {
          href: "/invoices",
          label: "Invoices",
          icon: "/icons/note-2.svg",
          submenus: [],
        },
        {
          href: "/price-management",
          label: "Price Management",
          icon: "/icons/receipt-discount.svg",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "ADMIN",
      menus: [
        {
          href: "/admin/users",
          label: "User Management",
          icon: "/icons/user-circle.svg",
          adminOnly: true,
          submenus: [],
        },
        {
          href: "/admin/orders",
          label: "User's Orders",
          icon: "/icons/bag-2.svg",
          adminOnly: true,
          submenus: [],
        },
        {
          href: "/admin/products",
          label: "Kainodara",
          icon: "/icons/box.svg",
          adminOnly: true,
          submenus: [],
        },
        {
          href: "/admin/payments",
          label: "Payments",
          icon: "/icons/empty-wallet.svg",
          adminOnly: true,
          submenus: [],
        },
        {
          href: "/admin/payout",
          label: "Payout",
          icon: "/icons/receipt-discount.svg",
          adminOnly: true,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "PREFERENCES",
      menus: [
        {
          href: "/settings",
          label: "Settings",
          icon: "/icons/setting-2.svg",
          submenus: [],
        },
        {
          href: "/support",
          label: "Support",
          icon: "/icons/info-circle.svg",
          submenus: [],
        },
      ],
    },
  ];
}
