import * as React from "react"
import { Slider } from "@/shared/components/ui/slider"
import { formatCurrency } from "@/shared/lib/numbers"

type Props = {
  minPrice: number
  maxPrice: number
  setMinPrice: (val: number) => void
  setMaxPrice: (val: number) => void
  min?: number
  max?: number
}

export const PriceRangeSlider = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, min = 0, max = 1000 }: Props) => {
  const [value, setValue] = React.useState<[number, number]>([minPrice ?? min, maxPrice ?? max])

  React.useEffect(() => {
    setMinPrice(value[0])
    setMaxPrice(value[1])
  }, [value, setMinPrice, setMaxPrice])

  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-sm text-gray-600'>
        <span>{formatCurrency(value[0])}</span>
        <span>{formatCurrency(value[1])}</span>
      </div>

      <Slider value={value} onValueChange={(val: [number, number]) => setValue(val)} min={min} max={max} step={10} />
    </div>
  )
}
