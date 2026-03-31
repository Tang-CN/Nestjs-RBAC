import { Inject, Injectable } from '@nestjs/common'
import type { RedisClientType } from 'redis'

export const USER_ACCESS_TOKEN_KEY = 'user_access_token'

export const ACCESS_TOKEN_EXPIRATION_TIME = 3600 * 24 * 3

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType

  async get(key: string) {
    return await this.redisClient.get(key)
  }

  async set(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value)

    if (ttl) {
      await this.redisClient.expire(key, ttl)
    }
  }

  async del(key: string) {
    await this.redisClient.del(key)
    return true
  }

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key)
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name])
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl)
    }
  }

  async ttl(key: string) {
    const ttl = await this.redisClient.ttl(key)
    if (ttl < 0) return 0
    return ttl
  }
}
