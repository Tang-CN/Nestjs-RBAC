import { IsString, IsOptional, MaxLength, IsNumber, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdatePermissionDto {
  @ApiProperty({ description: '权限ID' })
  @IsNotEmpty()
  @IsNumber()
  permissionId: number
  @ApiPropertyOptional({ description: '权限名称' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string

  @ApiPropertyOptional({ description: '权限编码' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  code?: string

  @ApiPropertyOptional({ description: '权限描述' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string

  @ApiPropertyOptional({ description: '资源路径' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  resource?: string

  @ApiPropertyOptional({ description: '操作类型' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  action?: string

  @ApiPropertyOptional({ description: '状态：1-启用，0-禁用' })
  @IsOptional()
  @IsNumber()
  status?: number
}
