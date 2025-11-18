"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export const ProductCardSkeleton = () => {
  return (
    <div className='bg-white rounded-md overflow-hidden shadow-md p-0'>
      {/* Image Skeleton */}
      <div className='h-72 w-full relative'>
        <Skeleton className='h-full w-full rounded-none' />

        {/* Action buttons over image */}
        <div className='absolute top-2 right-2 flex gap-2 p-2 opacity-60'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <Skeleton className='h-8 w-8 rounded-full' />
        </div>
      </div>

      {/* Content */}
      <section className='p-4 space-y-3'>
        {/* Title & Price */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-4 w-1/3' />
        </div>

        {/* Category Badge */}
        <Skeleton className='h-6 w-24 rounded-md' />

        {/* Add to cart button */}
        <Skeleton className='h-10 w-full rounded-md' />
      </section>
    </div>
  )
}
