import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { RedisService } from '@/shared/redis.service'
import { CACHE_KEY, CACHE_TTL } from '../decorators/cache.decorator'

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private redisService: RedisService,
    private reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const cacheKey = this.reflector.get<string>(CACHE_KEY, context.getHandler())
    const cacheTTL = this.reflector.get<number>(CACHE_TTL, context.getHandler()) || 300

    // 如果没有缓存装饰器，直接执行
    if (!cacheKey) {
      return next.handle()
    }

    // 构建完整的缓存键
    const request = context.switchToHttp().getRequest()
    const fullCacheKey = this.buildCacheKey(cacheKey, request)

    // 尝试从缓存获取
    const cachedData = await this.redisService.get(fullCacheKey)
    if (cachedData) {
      if (typeof cachedData === 'string') return of(JSON.parse(cachedData))
    }

    // 执行方法并缓存结果
    return next.handle().pipe(
      mergeMap(async (data) => {
        await this.redisService.set(fullCacheKey, JSON.stringify(data), cacheTTL)
      }),
    )
  }

  private buildCacheKey(key: string, request: any): string {
    let result = key

    // 替换 :param 占位符
    const params = request.params || {}
    const query = request.query || {}

    // 替换路径参数
    Object.keys(params).forEach((param) => {
      result = result.replace(`:${param}`, String(params[param]))
    })

    // 替换查询参数
    Object.keys(query).forEach((param) => {
      result = result.replace(`:${param}`, String(query[param]))
    })

    // 添加用户ID前缀（如果存在）
    if (request.user?.userId) {
      result = `user:${request.user.userId}:${result}`
    }

    return result
  }
}
