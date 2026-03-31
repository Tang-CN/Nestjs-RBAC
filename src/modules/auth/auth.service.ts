import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserService } from '../user/user.service'
import { RedisService } from '@/shared/redis.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async login(loginDto) {
    const { username, password } = loginDto
    const user = await this.userService.findByUsername(username)

    if (!user) {
      throw new UnauthorizedException('用户名或密码错误')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码错误')
    }

    // if (user.status !== 1) {
    //   throw new UnauthorizedException('用户已被禁用')
    // }

    const payload = { sub: user.id, username: user.username }
    const accessToken = this.jwtService.sign(payload)

    // 将token存储到Redis中，设置过期时间
    await this.redisService.set(
      `token:${user.id}`,
      accessToken,
      7 * 24 * 60 * 60, // 7天过期
    )

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
        roles: user.roles,
      },
    }
  }

  async logout(userId: number) {
    await this.redisService.del(`token:${userId}`)
    return { message: '退出成功' }
  }

  async validateUser(userId: number) {
    const user = await this.userService.findOne(userId)
    if (!user || !user.isActive) {
      throw new UnauthorizedException('用户不存在或已被禁用')
    }
    return user
  }

  async getUserPermissions(userId: number) {
    const user = await this.userService.findOne(userId)
    const permissions = []

    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        if (permission.isActive) {
          permissions.push(permission.code)
        }
      })
    })

    return [...new Set(permissions)] // 去重
  }
}
