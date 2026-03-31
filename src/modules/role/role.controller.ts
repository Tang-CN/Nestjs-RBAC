import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/modules/auth/guards/roles.guard'
import { Permissions } from '@/common/decorators/index'
import { Cacheable } from '@/common/decorators/index'
import { CacheEvict } from '@/common/decorators/index'
import { CacheInterceptor } from '@/common/interceptors/cache.interceptor'
import { CacheEvictInterceptor } from '@/common/interceptors/cache-evict.interceptor'

@ApiTags('角色管理')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(CacheInterceptor)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Permissions('role:create')
  @ApiOperation({ summary: '创建角色' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @Get()
  @Permissions('role:list')
  @Cacheable('roles:list', 600)
  @ApiOperation({ summary: '获取所有角色' })
  findAll() {
    return this.roleService.findAll()
  }

  @Get(':id')
  @Permissions('role:detail')
  @ApiOperation({ summary: '根据ID获取角色' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id)
  }

  @Post('update')
  @Permissions('role:update')
  @UseInterceptors(CacheEvictInterceptor)
  @CacheEvict('roles:list', 'roles:detail')
  @ApiOperation({ summary: '更新角色' })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto.roleId, updateRoleDto)
  }

  @Post('delete')
  @Permissions('role:delete')
  @UseInterceptors(CacheEvictInterceptor)
  @CacheEvict('roles:list', 'roles:detail')
  @ApiOperation({ summary: '删除角色' })
  remove(@Body() body: { roleId: number }) {
    return this.roleService.remove(body.roleId)
  }

  @Post('permissions')
  @Permissions('role:update')
  @UseInterceptors(CacheEvictInterceptor)
  @CacheEvict('roles:list', 'roles:detail')
  @ApiOperation({ summary: '更新角色权限' })
  updatePermissions(@Body() body: { roleId: number; permissionIds: number[] }) {
    return this.roleService.updatePermissions(body.roleId, body.permissionIds)
  }
}
