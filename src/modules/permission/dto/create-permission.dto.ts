import { IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePermissionDto {
  @ApiProperty({ description: '权限名称', example: '创建用户' })
  @IsString()
  @MaxLength(50)
  name: string

  @ApiProperty({ description: '权限编码', example: 'user:create' })
  @IsString()
  @MaxLength(100)
  code: string

  @ApiProperty({ description: '权限描述', example: '创建新用户' })
  @IsString()
  @MaxLength(500)
  description: string

  @ApiProperty({ description: '资源路径', example: '/users' })
  @IsString()
  @MaxLength(200)
  resource: string

  @ApiProperty({ description: '操作类型', example: 'create' })
  @IsString()
  @MaxLength(20)
  action: string
}
