import { Repository, FindManyOptions } from 'typeorm'

export interface PageResult<T> {
  list: T[]
  total: number
}

export async function paginate<T>(
  repo: Repository<T>,
  options: FindManyOptions<T>,
  query: { page?: string; pageSize?: string },
): Promise<PageResult<T>> {
  const page = Number(query.page) || 1
  const pageSize = Number(query.pageSize) || 10

  const [list, total] = await repo.findAndCount({
    take: pageSize,
    skip: (page - 1) * pageSize,
    ...options,
  })

  return {
    list,
    total,
  }
}
