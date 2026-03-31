import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { Role } from './role.entity'
import { Permission } from '../permission/permission.entity'
import { CacheInterceptor } from '../../common/interceptors/cache.interceptor'
import { CacheEvictInterceptor } from '../../common/interceptors/cache-evict.interceptor'

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RoleController],
  providers: [RoleService, CacheInterceptor, CacheEvictInterceptor],
  exports: [RoleService],
})
export class RoleModule {}
