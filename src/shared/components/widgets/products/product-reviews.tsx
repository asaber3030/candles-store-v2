import moment from "moment"

import { useTranslations } from "next-intl"
import { useCurrentUser } from "@/entities/auth/hooks/useAuth"

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { ProductReview, User } from "@prisma/client"
import { CreateUserReview } from "@/features/reviews/ui/create-review"

type Props = {
  reviews: (ProductReview & { user: User })[]
  productId: number
}

export const ProductReviewsViewer = ({ productId, reviews }: Props) => {
  const t = useTranslations()
  const { user } = useCurrentUser()
  const avg = (reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length || 0).toFixed(2)

  return (
    <section>
      <h2 className='text-2xl font-bold mb-6'>
        {t("Customer Reviews")} ({avg})
      </h2>
      {reviews.length == 0 ? (
        <p className='text-gray-500 mb-4'>{t("No reviews yet")}</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {reviews.map((review) => (
            <div key={review.id} className='border rounded p-4 shadow-sm flex flex-col gap-2 bg-white'>
              <div className='flex items-center justify-between'>
                <div className='flex gap-2 items-center'>
                  <Avatar className='size-10'>
                    <AvatarFallback>{review.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <span className='font-semibold'>
                      {review.user.name} {user?.id == review.userId && "(Me)"}
                    </span>
                    <span className='text-sm text-gray-500'>{moment(review.createdAt).format("YYYY-MM-DD")}</span>
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rate ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className='text-gray-700'>{review.review}</p>
            </div>
          ))}
        </div>
      )}

      <CreateUserReview productId={productId} />
    </section>
  )
}
