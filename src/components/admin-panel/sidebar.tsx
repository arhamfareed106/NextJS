"use client";

import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/admin-panel/logo";
import { LogoName } from "@/components/admin-panel/logo-name";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-[265px]",
        settings.disabled && "hidden"
      )}
    >
      {/* <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} /> */}
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="flex flex-col h-full"
      >
        {/* Sticky header */}
        <div className="flex-shrink-0 px-3 py-4">
          {" "}
          {/* Changed to flex-shrink-0 */}
          <Button
            className={cn(
              "transition-transform ease-in-out duration-300",
              !getOpenState() ? "translate-x-1" : "translate-x-0"
            )}
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex justify-start gap-2">
              <span className={cn(!getOpenState() ? "" : "hidden")}>
                <Logo />
              </span>
              <span className={cn(!getOpenState() ? "hidden" : "")}>
                <LogoName />
              </span>
            </Link>
          </Button>
        </div>

        {/* Scrollable content */}
        <div
          className={`flex-1 ${
            isOpen ? "overflow-y-auto" : ""
          } px-3 py-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent`}
        >
          <Menu isOpen={getOpenState()} />
        </div>
      </div>
    </aside>
  );
}
