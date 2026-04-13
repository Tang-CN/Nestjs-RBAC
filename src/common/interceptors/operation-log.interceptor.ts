import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, mergeMap } from 'rxjs'
import { OperationLogService } from '@/modules/operation-log/operation-log.service'
import { OPERATION_LOG_KEY, OperationLogOptions } from '../decorators/operation-log.decorator'
import { OperationAction, OperationModule } from '@/modules/operation-log/operation-log.entity'
import { Request } from 'express'
import { ModuleRef } from '@nestjs/core'

@Injectable()
export class OperationLogInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private operationLogService: OperationLogService,
    private moduleRef: ModuleRef,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const options = this.reflector.get<OperationLogOptions>(OPERATION_LOG_KEY, context.getHandler())

    if (!options) {
      return next.handle()
    }

    const req = context.switchToHttp().getRequest<Request>()
    const idParam = options.getIdParam || 'id'
    const targetId = Number(req.body[idParam]) || req.body?.id

    let beforeData: any = null

    // UPDATE/DELETE操作先查询原始数据
    if (options.action === OperationAction.UPDATE || options.action === OperationAction.DELETE) {
      // 这里可以扩展不同模块的数据查询逻辑
      if (options.service && options.method && targetId) {
        const serviceInstance = this.moduleRef.get(options.service, {
          strict: false,
        })
        beforeData = await serviceInstance[options.method](targetId)
      }
    }

    return next.handle().pipe(
      mergeMap(async (result) => {
        try {
          await this.operationLogService.record(
            req,
            options.action,
            options.module,
            targetId || result?.id,
            beforeData,
            result,
          )
        } catch (e) {
          console.error('记录操作日志失败:', e)
        }

        return result
      }),
    )
  }
}
