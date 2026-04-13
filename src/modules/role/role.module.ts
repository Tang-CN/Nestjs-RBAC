import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { Role } from './role.entity'
import { Permission } from '../permission/permission.entity'
import { CacheInterceptor } from '../../common/interceptors/cache.interceptor'
import { CacheEvictInterceptor } from '../../common/interceptors/cache-evict.interceptor'
import { OperationLogModule } from '../operation-log/operation-log.module'

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), OperationLogModule],
  controllers: [RoleController],
  providers: [RoleService, CacheInterceptor, CacheEvictInterceptor],
  exports: [RoleService],
})
export class RoleModule {}
