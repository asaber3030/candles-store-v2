"use client"

import { Input } from "@/shared/components/ui/input"
import { SearchIcon } from "lucide-react"

type Props = {
  search: string
  setSearch: (value: string) => void
}

export function AdvancedSearchBar({ search, setSearch }: Props) {
  return (
    <div className='relative'>
      <SearchIcon className='absolute xl:left-2 left-4 top-1/2 -translate-y-1/2 text-gray-500' size={17} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={"Search..."} className='xl:pl-10 pl-8 py-4' />
    </div>
  )
}
