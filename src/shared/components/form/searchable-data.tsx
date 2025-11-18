"use client"

import * as React from "react"

import { cn } from "@/shared/lib/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { Loader2, SearchIcon, CheckIcon, X } from "lucide-react"
import { ClassValue } from "class-variance-authority/types"
import { Button } from "@/shared/components/ui/button"
import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"

type SearchableItem = {
  id: number
  label: string
}

type Props = {
  data?: SearchableItem[]
  label: string
  form: any
  formItem: string
  defaultSelectedId?: number
  className?: ClassValue
  loading?: boolean
  error?: string
  executeFunctionWithId?: (value: number | undefined) => void
}

export function SearchableData({ data = [], className, label, form, formItem, defaultSelectedId, loading, error, executeFunctionWithId }: Props) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const selectedId = form.watch(formItem) ?? defaultSelectedId
  const selectedItem = data.find((i) => i.id === selectedId)

  const filteredData = React.useMemo(() => {
    if (!query) return data
    return data.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
  }, [data, query])

  const handleSelect = (id: number) => {
    form.setValue(formItem, id)
    executeFunctionWithId?.(id)
    setOpen(false)
    setQuery("")
  }

  const handleClear = () => {
    form.setValue(formItem, undefined)
    executeFunctionWithId?.(undefined)
    setQuery("")
    setOpen(false)
  }

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  return (
    <div className='w-full'>
      <Label htmlFor={`${formItem}-input`} className='mb-2 block'>
        {label}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} aria-controls={`${formItem}-content`} className='w-full justify-between h-9 pr-2'>
            <span className='truncate'>{selectedItem ? selectedItem.label : `Select a ${label.toLowerCase()}...`}</span>

            {/* Clear Button */}
            {selectedItem && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='ml-2 h-auto p-1 rounded-sm'
                onClick={(e) => {
                  e.stopPropagation() // Prevent the Popover from toggling
                  handleClear()
                }}
                aria-label='Clear selection'
              >
                <X size={14} className='text-muted-foreground hover:text-foreground' />
              </Button>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className={cn("w-[500px] p-0", className)} id={`${formItem}-content`} align='start'>
          <div className='flex items-center border-b p-1.5'>
            <SearchIcon size={16} className='ml-2 text-muted-foreground' />
            <Input id={`${formItem}-input`} ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${label.toLowerCase()}...`} className='h-8 w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground' autoFocus />
          </div>

          <div className='max-h-60 overflow-y-auto' role='listbox'>
            {loading ? (
              <div className='flex items-center justify-center p-4'>
                <Loader2 className='animate-spin text-primary' size={20} />
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  role='option'
                  aria-selected={item.id === selectedId}
                  onClick={() => handleSelect(item.id)}
                  className={cn("flex items-center gap-2 p-2 px-3 cursor-pointer select-none text-sm transition-colors", "hover:bg-accent hover:text-accent-foreground", item.id === selectedId ? "bg-primary/10 text-primary font-medium" : "text-foreground")}
                >
                  <div className='flex-grow'>{item.label}</div>
                  <CheckIcon size={14} className={cn("ml-auto transition-opacity", item.id === selectedId ? "opacity-100" : "opacity-0")} />
                </div>
              ))
            ) : (
              <div className='p-3 text-sm text-muted-foreground text-center'>No results found for "{query}".</div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className='text-red-500 mt-1 text-sm'>{error}</p>}
    </div>
  )
}
