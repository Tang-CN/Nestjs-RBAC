import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string

  @ApiProperty({ description: '邮箱', example: 'admin@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string

  @ApiPropertyOptional({ description: '昵称', example: '管理员' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nickname?: string

  @ApiPropertyOptional({ description: '头像URL' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  avatar?: string
}
