import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'
import { RedisService } from '@/shared/redis.service'

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
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    const { sub: userId } = payload

    // 检查token是否在Redis中存在
    const cachedToken = await this.redisService.get(`token:${userId}`)
    if (!cachedToken) {
      throw new UnauthorizedException('token已过期或无效')
    }

    // 验证用户是否存在且状态正常
    const user = await this.authService.validateUser(userId)
    if (!user) {
      throw new UnauthorizedException('用户不存在或已被禁用')
    }

    const permissions = await this.authService.getUserPermissions(userId)

    return { ...user, permissions }
  }
}
