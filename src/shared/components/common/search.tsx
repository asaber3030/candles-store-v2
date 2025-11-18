"use client"

import { Input } from "@/shared/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"

export function SearchBar({ queryParamName = "search" }: { queryParamName?: string }) {
  const router = useRouter()
  const sp = useSearchParams()

  const [search, setSearch] = useState(sp.get(queryParamName) || "")

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`?${queryParamName}=${search}`)
  }

  return (
    <form className='relative' onSubmit={handleSearch}>
      <SearchIcon className='absolute xl:left-2 left-4 top-1/2 -translate-y-1/2 text-gray-500' size={17} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={"بحث ..."} className='xl:pl-10 pl-8 py-4' />
    </form>
  )
}
