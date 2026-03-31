import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsNumber, IsArray, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class UpdateUserDto {
  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty()
  @IsNumber()
  userId: number
  @ApiPropertyOptional({ description: '用户名' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username?: string

  @ApiPropertyOptional({ description: '邮箱' })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({ description: '密码' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password?: string

  @ApiPropertyOptional({ description: '昵称' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nickname?: string

  @ApiPropertyOptional({ description: '头像URL' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  avatar?: string

  @ApiPropertyOptional({ description: '状态：1-启用，0-禁用' })
  @IsOptional()
  @IsNumber()
  status?: number

  @ApiPropertyOptional({ description: '角色ID数组', type: [Number] })
  @IsOptional()
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  roleIds?: number[]
}
