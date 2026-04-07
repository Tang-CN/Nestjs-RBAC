import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@ApiTags('认证管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.login({ ...loginDto })
  }

  @Post('refresh')
  @ApiOperation({ summary: '刷新 Token' })
  refresh(@Body() refreshDto: { refreshToken: string }) {
    return this.authService.refreshTokens(refreshDto.refreshToken)
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '用户退出' })
  logout(@Request() req) {
    return this.authService.logout(req.user.id)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户信息' })
  getProfile(@Request() req) {
    return req.user
  }

  @Get('permissions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户权限' })
  getPermissions(@Request() req) {
    return this.authService.getUserPermissions(req.user.id)
  }
}
