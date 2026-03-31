import { IsString, IsOptional, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称', example: '管理员' })
  @IsString()
  @MaxLength(50)
  name: string

  @ApiProperty({ description: '角色编码', example: 'admin' })
  @IsString()
  @MaxLength(100)
  code: string

  @ApiPropertyOptional({ description: '角色描述' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string
}
