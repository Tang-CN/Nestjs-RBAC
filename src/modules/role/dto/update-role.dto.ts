import { IsString, IsOptional, MaxLength, IsNumber, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateRoleDto {
  @ApiProperty({ description: '角色ID' })
  @IsNotEmpty()
  @IsNumber()
  roleId: number
  @ApiPropertyOptional({ description: '角色名称' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string

  @ApiPropertyOptional({ description: '角色编码' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  code?: string

  @ApiPropertyOptional({ description: '角色描述' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string

  @ApiPropertyOptional({ description: '状态：1-启用，0-禁用' })
  @IsOptional()
  @IsNumber()
  status?: number
}
