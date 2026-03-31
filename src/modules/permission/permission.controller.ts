import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { PermissionService } from './permission.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/modules/auth/guards/roles.guard'
import { Permissions } from '../../common/decorators/permissions.decorator'

@ApiTags('权限管理')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @Permissions('permission:create')
  @ApiOperation({ summary: '创建权限' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto)
  }

  @Get()
  @Permissions('permission:list')
  @ApiOperation({ summary: '获取所有权限' })
  findAll() {
    return this.permissionService.findAll()
  }

  @Get(':id')
  @Permissions('permission:detail')
  @ApiOperation({ summary: '根据ID获取权限' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.findOne(id)
  }

  @Post('update')
  @Permissions('permission:update')
  @ApiOperation({ summary: '更新权限' })
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(updatePermissionDto.permissionId, updatePermissionDto)
  }

  @Post('delete')
  @Permissions('permission:delete')
  @ApiOperation({ summary: '删除权限' })
  remove(@Body() body: { permissionId: number }) {
    return this.permissionService.remove(body.permissionId)
  }

  @Post('tree')
  @Permissions('permission:list')
  @ApiOperation({ summary: '获取权限树' })
  getTreeByRole(@Body() body: { roleId: number }) {
    return this.permissionService.getTreeByRole(body.roleId)
  }
}
