export type PageResult<T> = {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: Array<T>
}

export type PagePramas = {
  page?: number
  pageSize?: number
}
