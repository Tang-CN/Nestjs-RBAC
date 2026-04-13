import { SetMetadata } from '@nestjs/common'
import { OperationAction, OperationModule } from '@/modules/operation-log/operation-log.entity'
import { Request } from 'express'
export const OPERATION_LOG_KEY = 'operation_log'

export interface OperationLogOptions<T = any> {
  module: OperationModule
  action: OperationAction
  getIdParam?: string
  // loader?: (id: number, req: Request) => Promise<T>
  service?: any
  method?: string
}

export const OperationLog = (options: OperationLogOptions) => SetMetadata(OPERATION_LOG_KEY, options)
