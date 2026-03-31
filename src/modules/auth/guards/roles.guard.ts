import { CustomException } from '@/common/exception/custom.exception'
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler())

    if (!requiredPermissions) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new CustomException('用户未登录')
    }

    const userPermissions = user.permissions || []
    const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission))

    if (!hasPermission) {
      throw new CustomException('权限不足，无法访问该资源', 403)
    }

    return true
  }
}
