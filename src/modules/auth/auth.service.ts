import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcryptjs'
import { UserService } from '../user/user.service'
import { RedisService } from '@/shared/redis.service'
import { CustomException } from '@/common/exception/custom.exception'
import { USER_ERR, ERR } from '@/shared/constants/error-code'
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private redisService: RedisService,
  ) {}

  async login(loginDto) {
    const { username, password } = loginDto
    const user = await this.userService.findByUsername(username)

    if (!user) {
      throw new CustomException(USER_ERR.USER_PASSWORD_ERROR)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new CustomException(USER_ERR.USER_PASSWORD_ERROR)
    }

    const payload = { sub: user.id, username: user.username }

    // 生成 accessToken 和 refreshToken
    const accessToken = this.generateAccessToken(payload)
    const refreshToken = this.generateRefreshToken(payload)

    // 将 token 存储到 Redis 中
    const accessExpiresIn = this.parseExpiresIn(this.configService.get('JWT_ACCESS_EXPIRES_IN'))
    const refreshExpiresIn = this.parseExpiresIn(this.configService.get('JWT_REFRESH_EXPIRES_IN'))

    await this.redisService.set(`access_token:${user.id}`, accessToken, accessExpiresIn)
    await this.redisService.set(`refresh_token:${user.id}`, refreshToken, refreshExpiresIn)

    return {
      accessToken,
      refreshToken,
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

  async refreshTokens(refreshToken: string) {
    try {
      // 验证 refreshToken
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      })

      const { sub: userId } = payload

      // 检查 refreshToken 是否在 Redis 中存在
      const cachedRefreshToken = await this.redisService.get(`refresh_token:${userId}`)
      if (!cachedRefreshToken || cachedRefreshToken !== refreshToken) {
        throw new CustomException(ERR.REFRESH_TOKEN_INVALID)
      }

      // 验证用户是否存在且状态正常
      const user = await this.userService.findOne(userId)
      if (!user || !user.isActive) {
        throw new CustomException(ERR.USER_DISABLED)
      }

      // 生成新的 token 对
      const newPayload = { sub: user.id, username: user.username }
      const newAccessToken = this.generateAccessToken(newPayload)
      const newRefreshToken = this.generateRefreshToken(newPayload)

      // 更新 Redis 中的 token
      const accessExpiresIn = this.parseExpiresIn(this.configService.get('JWT_ACCESS_EXPIRES_IN'))
      const refreshExpiresIn = this.parseExpiresIn(this.configService.get('JWT_REFRESH_EXPIRES_IN'))

      await this.redisService.set(`access_token:${userId}`, newAccessToken, accessExpiresIn)
      await this.redisService.set(`refresh_token:${userId}`, newRefreshToken, refreshExpiresIn)

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    } catch (error) {
      if (error instanceof CustomException) {
        throw error
      }
      throw new CustomException(ERR.REFRESH_TOKEN_INVALID)
    }
  }

  async logout(userId: number) {
    await this.redisService.del(`access_token:${userId}`)
    await this.redisService.del(`refresh_token:${userId}`)
    return { message: '退出成功' }
  }

  async validateUser(userId: number) {
    const user = await this.userService.findOne(userId)
    if (!user || !user.isActive) {
      throw new CustomException(ERR.USER_DISABLED)
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

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
    })
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    })
  }

  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/)
    if (!match) {
      return 7200 // 默认 2 小时
    }

    const value = parseInt(match[1])
    const unit = match[2]

    switch (unit) {
      case 's':
        return value
      case 'm':
        return value * 60
      case 'h':
        return value * 3600
      case 'd':
        return value * 86400
      default:
        return 7200
    }
  }
}
