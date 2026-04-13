import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OperationLog } from './operation-log.entity'
import { OperationLogService } from './operation-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([OperationLog])],
  providers: [OperationLogService],
  exports: [OperationLogService],
})
export class OperationLogModule {}
