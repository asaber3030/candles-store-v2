"use client";

import { FormEvent, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { useRouter } from "next/navigation";

export const NavbarSearch = () => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?search=${query}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative size-10 rounded-full" size="icon">
          <SearchIcon className="size-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="xl:w-[350px] w-full p-4 shadow-lg rounded-xl" align="end" side="bottom">
        <form onSubmit={handleSearch} className="flex flex-col space-y-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <Button className="w-full">Search</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
