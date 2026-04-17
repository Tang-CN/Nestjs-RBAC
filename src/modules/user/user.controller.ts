import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/modules/auth/guards/roles.guard'
import { Permissions } from '../../common/decorators/permissions.decorator'

@ApiTags('用户管理')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Permissions('user:create')
  @ApiOperation({ summary: '创建用户' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  @Permissions('user:list')
  @ApiOperation({ summary: '获取用户列表（分页）' })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认1' })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量，默认10，最大100' })
  findAll(@Query() query: { page?: string; pageSize?: string }) {
    return this.userService.findAll(query)
  }

  @Get(':id')
  @Permissions('user:detail')
  @ApiOperation({ summary: '根据ID获取用户' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id)
  }

  @Post('update')
  @Permissions('user:update')
  @ApiOperation({ summary: '更新用户' })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.userId, updateUserDto)
  }

  @Post('delete')
  @Permissions('user:delete')
  @ApiOperation({ summary: '删除用户' })
  remove(@Body() body: { userId: number }) {
    return this.userService.remove(body.userId)
  }

  @Post('roles')
  @Permissions('user:update')
  @ApiOperation({ summary: '更新用户角色' })
  updateRoles(@Body() body: { userId: number; roleIds: number[] }) {
    return this.userService.updateRoles(body.userId, body.roleIds)
  }
}
