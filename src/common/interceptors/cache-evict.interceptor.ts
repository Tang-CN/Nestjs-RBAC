import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { RedisService } from '@/shared/redis.service'
import { CACHE_EVICT_KEY } from '../decorators/cache-evict.decorator'

@Injectable()
export class CacheEvictInterceptor implements NestInterceptor {
  @Inject(RedisService)
  private redisService: RedisService

  @Inject(Reflector)
  private reflector: Reflector

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const cacheKeys = this.reflector.get<string[]>(CACHE_EVICT_KEY, context.getHandler())

    return next.handle().pipe(
      tap(async () => {
        if (cacheKeys && cacheKeys.length > 0) {
          const request = context.switchToHttp().getRequest()

          for (const key of cacheKeys) {
            const fullCacheKey = this.buildCacheKey(key, request)
            await this.redisService.del(fullCacheKey)
          }
        }
      }),
    )
  }

  private buildCacheKey(key: string, request: any): string {
    let result = key

    // 替换 :param 占位符
    const params = request.params || {}
    const body = request.body || {}

    // 替换路径参数
    Object.keys(params).forEach((param) => {
      result = result.replace(`:${param}`, String(params[param]))
    })

    // 替换body参数
    Object.keys(body).forEach((param) => {
      result = result.replace(`:${param}`, String(body[param]))
    })

    // 添加用户ID前缀（如果存在）
    if (request.user?.userId) {
      result = `user:${request.user.userId}:${result}`
    }

    return result
  }
}
