import { Repository, FindManyOptions, SelectQueryBuilder } from 'typeorm'

export interface PageResult<T> {
  list: T[]
  total: number
}

export interface PaginationQuery {
  page?: number | string
  pageSize?: number | string
}

/**
 * 分页工具函数 - 支持Repository方式
 * @param repo TypeORM Repository实例
 * @param options 查询选项
 * @param query 分页参数
 */
export async function paginate<T>(
  repo: Repository<T>,
  options: FindManyOptions<T>,
  query: PaginationQuery,
): Promise<PageResult<T>> {
  const page = Math.max(1, Number(query.page) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(query.pageSize) || 10))

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

/**
 * 分页工具函数 - 支持QueryBuilder方式
 * @param qb TypeORM QueryBuilder实例
 * @param query 分页参数
 */
export async function paginateQueryBuilder<T>(
  qb: SelectQueryBuilder<T>,
  query: PaginationQuery,
): Promise<PageResult<T>> {
  const page = Math.max(1, Number(query.page) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(query.pageSize) || 10))

  const [list, total] = await qb
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getManyAndCount()

  return {
    list,
    total,
  }
}
