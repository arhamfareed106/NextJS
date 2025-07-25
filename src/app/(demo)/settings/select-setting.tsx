"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SidebarNavProps } from "./sidebar-nav-props";
import { useRouter } from "next/navigation";

export default function SelectDemo({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const router = useRouter(); // Initialize navigate function

  const handleSelectChange = (value: string) => {
    router.push(`${value}`);
  };
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select settings" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Settings</SelectLabel>

          {items.map((item) => (
            <SelectItem key={item.href} value={item.href}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
