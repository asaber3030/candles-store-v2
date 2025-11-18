import { useUserHasProductReview } from "@/entities/product/hooks/useProduct"
import { useForm, Controller } from "react-hook-form"
import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useState } from "react"

import { createProductReviewAction } from "@/entities/product/api/proudct.api"
import { zodResolver } from "@hookform/resolvers/zod"

import { TCreateProductReviewPayload } from "@/entities/product/model/product"
import { CreateProductReviewSchema } from "@/entities/product/model/product.schema"
import { Loading } from "@/shared/components/common/loader"
import { Button } from "@/shared/components/ui/button"
import { useTranslations } from "next-intl"

type Props = {
  productId: number
}

export const CreateUserReview = ({ productId }: Props) => {
  const t = useTranslations()
  const [hoverRate, setHoverRate] = useState<number>(0)

  const form = useForm({
    resolver: zodResolver(CreateProductReviewSchema),
    defaultValues: {
      rate: 5,
      review: ""
    }
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: { data: TCreateProductReviewPayload }) => createProductReviewAction(productId, data),
    onSuccess: (data) => {
      if (data.status == 201) {
        form.reset({ rate: 5, review: "" })
      }
    }
  })

  const { hasReview, isHasReviewLoading } = useUserHasProductReview(productId)

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate({ data: values })
  })

  if (isHasReviewLoading) {
    return <Loading />
  }

  if (hasReview) {
    return <p className='text-gray-500 my-4'>{t("You have already submitted a review for this product.")}</p>
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 border p-4 rounded shadow-sm my-4 bg-white'>
      <h3 className='text-lg font-semibold'>{t("Write a Review")}</h3>

      {/* Rating */}
      <Controller
        name='rate'
        control={form.control}
        render={({ field }) => (
          <div className='flex items-center gap-1'>
            {Array.from({ length: 5 }).map((_, i) => {
              const value = i + 1
              return (
                <span key={i} className={`cursor-pointer text-2xl ${value <= (hoverRate || field.value) ? "text-yellow-400" : "text-gray-300"}`} onMouseEnter={() => setHoverRate(value)} onMouseLeave={() => setHoverRate(0)} onClick={() => field.onChange(value)}>
                  ★
                </span>
              )
            })}
          </div>
        )}
      />
      {form.formState.errors.rate && <p className='text-red-500 text-sm'>{form.formState.errors.rate.message}</p>}

      {/* Review Text */}
      <textarea {...form.register("review")} placeholder='Write your review...' className='border rounded p-2 w-full' />
      {form.formState.errors.review && <p className='text-red-500 text-sm'>{form.formState.errors.review.message}</p>}

      <Button type='submit' loading={mutation.isPending}>
        {mutation.isPending ? t("Submitting") : t("Submit Review")}
      </Button>
    </form>
  )
}
