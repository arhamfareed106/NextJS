"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function UserNavigationSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  const SearchInput = () => (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <Input
        type="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-8 pr-4"
      />
    </form>
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Desktop Search Bar */}
      <div className="hidden sm:block">
        <SearchInput />
      </div>

      {/* Mobile Search Icon and Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Open search</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SearchInput />
        </SheetContent>
      </Sheet>
    </div>
  );
}
