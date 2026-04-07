import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'
import { RedisService } from '@/shared/redis.service'
import { Request } from 'express'
import { CustomException } from '@/common/exception/custom.exception'
import { ERR } from '@/shared/constants/error-code'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: any) {
    const { sub: userId } = payload

    // 使用 ExtractJwt.fromAuthHeaderAsBearerToken() 获取token
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    if (!token) {
      throw new CustomException(ERR.TOKEN_INVALID)
    }

    // 检查 accessToken 是否在 Redis 中存在且匹配
    const cachedToken = await this.redisService.get(`access_token:${userId}`)
    if (!cachedToken || cachedToken !== token) {
      throw new CustomException(ERR.TOKEN_EXPIRED)
    }

    // 验证用户是否存在
    const user = await this.authService.validateUser(userId)
    if (!user) {
      throw new CustomException(ERR.USER_NOT_EXISTS)
    }

    const permissions = await this.authService.getUserPermissions(userId)

    return { ...user, permissions }
  }
}
