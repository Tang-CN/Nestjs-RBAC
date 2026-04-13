import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../auth/guards/roles.guard'
import { OperationLogService } from './operation-log.service'
import { OperationModule } from './operation-log.entity'

@Controller('operation-logs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 20) {
    return this.operationLogService.findAll(page, pageSize)
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: number) {
    return this.operationLogService.getHistoryByUser(userId)
  }

  @Get('permission/:id')
  getPermissionHistory(@Param('id') id: number) {
    return this.operationLogService.getHistoryByTarget(OperationModule.PERMISSION, id)
  }

  @Get('role/:id')
  getRoleHistory(@Param('id') id: number) {
    return this.operationLogService.getHistoryByTarget(OperationModule.ROLE, id)
  }
}
