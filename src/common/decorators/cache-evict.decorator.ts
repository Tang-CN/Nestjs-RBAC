import { SetMetadata } from '@nestjs/common'

export const CACHE_EVICT_KEY = 'cache_evict_key'

/**
 * 缓存清除装饰器
 * @param keys 要清除的缓存键数组，支持使用 :param 作为占位符
 */
export const CacheEvict = (...keys: string[]) => {
  return SetMetadata(CACHE_EVICT_KEY, keys)
}
