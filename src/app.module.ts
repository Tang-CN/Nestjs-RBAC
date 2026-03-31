import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SharedModule } from './shared/shared.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { RoleModule } from './modules/role/role.module'
import { PermissionModule } from './modules/permission/permission.module'

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 公共模块
    SharedModule,

    // 业务模块
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
