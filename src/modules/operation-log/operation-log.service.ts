import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OperationLog, OperationAction, OperationModule } from './operation-log.entity'
import { Request } from 'express'

@Injectable()
export class OperationLogService {
  constructor(
    @InjectRepository(OperationLog)
    private operationLogRepository: Repository<OperationLog>,
  ) {}

  /**
   * 记录操作日志
   */
  async record(
    req: Request,
    action: OperationAction,
    module: OperationModule,
    targetId: number,
    beforeData?: any,
    afterData?: any,
  ): Promise<OperationLog> {
    const log = this.operationLogRepository.create({
      userId: (req.user as any).id,
      username: (req.user as any).username,
      action,
      module,
      targetId,
      beforeData,
      afterData,
      ip: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('User-Agent'),
    })

    return await this.operationLogRepository.save(log)
  }

  /**
   * 查询指定目标的操作历史
   */
  async getHistoryByTarget(module: OperationModule, targetId: number): Promise<OperationLog[]> {
    return await this.operationLogRepository.find({
      where: { module, targetId },
      order: { createdAt: 'DESC' },
    })
  }

  /**
   * 查询用户的操作历史
   */
  async getHistoryByUser(userId: number): Promise<OperationLog[]> {
    return await this.operationLogRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    })
  }

  /**
   * 分页查询所有操作日志
   */
  async findAll(page = 1, pageSize = 20): Promise<{ list: OperationLog[]; total: number }> {
    const [list, total] = await this.operationLogRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return { list, total }
  }
}
