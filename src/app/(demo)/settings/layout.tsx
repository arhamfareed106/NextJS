import { Separator } from "@radix-ui/react-dropdown-menu";
import { Metadata } from "next";
import Image from "next/image";
import { SidebarNav } from "./components/sidebar-nav";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import SelectSetting from "./select-setting";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account settings and update your profile.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "XML Links",
    href: "/settings/xml",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Settings", href: "/settings" },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <ContentLayout title="Settings">
      <Breadcrumbs items={breadcrumbItems} />
      <Separator className="my-6" />
      <div className="space-y-6 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Account Settings
          </h2>
          <p className="text-muted-foreground">
            Manage your account settings and update your profile.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col md:space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 md:block hidden">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="md:hidden block pb-6">
            <SelectSetting items={sidebarNavItems} />
          </div>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </ContentLayout>
  );
}
