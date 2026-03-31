import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { Permission } from './permission.entity'
import { Role } from '../role/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
