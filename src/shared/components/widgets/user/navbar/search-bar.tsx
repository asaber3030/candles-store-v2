"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "use-intl"
import { useState } from "react"

import { ClassValue } from "class-variance-authority/types"
import { FormEvent } from "react"
import { Search } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"

type Props = {
  showInput?: boolean
  inputClassName?: ClassValue
}

export const SearchShop = ({ showInput, inputClassName }: Props) => {
  const searchParams = useSearchParams()
  const t = useTranslations()
  const router = useRouter()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [isShown, setIsShown] = useState(showInput)

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/shop?search=${search}`)
  }

  return (
    <form className='flex gap-2 items-center' onSubmit={handleSearch}>
      {isShown && <Input className='xl:w-[400px] w-[250px] h-10' value={search} placeholder={t("search")} onChange={(event) => setSearch(event.target.value)} />}
      <Button type='button' variant={isShown ? "default" : "outline"} className='h-10' icon={Search} onClick={() => setIsShown(!isShown)} />
    </form>
  )
}
