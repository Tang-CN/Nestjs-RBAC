import { CustomException } from '@/common/exception/custom.exception'
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ERR } from '@/shared/constants/error-code'
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
      throw new CustomException(ERR.USER_NOT_LOGIN)
    }

    const userPermissions = user.permissions || []
    const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission))

    if (!hasPermission) {
      throw new CustomException(ERR.PERMISSION_NOT_ENOUGH)
    }

    return true
  }
}
