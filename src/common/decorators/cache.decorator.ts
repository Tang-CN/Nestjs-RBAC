import { SetMetadata } from '@nestjs/common'

export const CACHE_KEY = 'cache_key'
export const CACHE_TTL = 'cache_ttl'

/**
 * 缓存装饰器
 * @param key 缓存键前缀，支持使用 :param 作为占位符
 * @param ttl 缓存过期时间（秒），默认300秒
 */
export const Cacheable = (key: string, ttl: number = 300) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    SetMetadata(CACHE_KEY, key)(target, propertyKey, descriptor)
    SetMetadata(CACHE_TTL, ttl)(target, propertyKey, descriptor)
  }
}
