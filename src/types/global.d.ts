type ApiResponse<T> = {
  message: string
  status: number
  data?: T
  errors?: any
}

type TObject = Record<string, string | any>
type TSearchParams = Promise<TObject>
type TOrderDirection = "asc" | "desc"

type PaginationParams = {
  page?: number
  pageSize?: number
}

type PaginationMeta = {
  total: number
  page: number
  pageSize: number
  hasNextPage: boolean
  hasPrevPage: boolean
  pages: number
}

type PaginatedResult<T> = {
  data: T[]
  pagination: PaginationMeta
}
