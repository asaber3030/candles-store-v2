"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"

import { adminRoutes } from "@/shared/config/routes"

import { ProductReview, User } from "@prisma/client"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { Star } from "lucide-react"

interface ReviewsSectionProps {
  reviews: (ProductReview & { user: User })[]
  productId: number
}

export default function ReviewsSection({ reviews, productId }: ReviewsSectionProps) {
  const t = useTranslations()

  const renderStars = (rate: number) => {
    return (
      <div className='flex gap-1'>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rate ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
        ))}
      </div>
    )
  }

  return (
    <Card className='p-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-bold'>{t("product.sections.reviews")}</h3>
        <Button size='sm' variant='default'>
          {t("product.buttons.create")}
        </Button>
      </div>

      {reviews.length == 0 && <NoDataLabel label={t("No Data Found")} />}

      <div className='space-y-4'>
        {reviews.map((review) => (
          <div key={review.id} className='border rounded-lg p-4 hover:bg-muted/50'>
            <div className='flex justify-between items-start mb-3'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-2'>
                  {renderStars(review.rate)}
                  <span className='text-sm text-muted-foreground'>({review.rate}/5)</span>
                </div>
                <Link href={adminRoutes.users.details(review.userId)} className='text-sm text-blue-600 hover:underline'>
                  {review.user.name} / {review.user.email}
                </Link>
              </div>
            </div>
            <p className='text-sm'>{review.review}</p>
            <p className='text-xs text-muted-foreground mt-2'>
              {t("product.reviews.created")}: {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
