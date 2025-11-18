import { getCategory } from "@/entities/category/api/category.api"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { ErrorAlert } from "@/shared/components/common/error-alert"
import { ViewCategoryProductsList } from "@/shared/components/widgets/user/categories/products-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse our product categories"
}

type Props = {
  params: Promise<{ categoryId: string }>
  searchParams: TSearchParams
}

export default async function ViewCategoryPage({ params, searchParams }: Props) {
  const { categoryId } = await params
  const sp = await searchParams
  const category = await getCategory(+categoryId)

  if (isNaN(Number(categoryId)) || !category) {
    return <ErrorAlert title={"Category Not Found"} description={"The category you are looking for does not exist."} />
  }

  return (
    <DefaultContainer className='py-10'>
      <ViewCategoryProductsList category={category} searchParams={sp} />
    </DefaultContainer>
  )
}
