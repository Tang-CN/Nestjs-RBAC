import { BadRequestException, Global, Module, ValidationPipe, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AllExceptionsFilter } from '@/common/filters/all-exception.filter'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { SharedService } from './shared.service'
import { RedisService } from './redis.service'
import { createClient } from 'redis'
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          autoLoadEntities: true,
          host: process.env.DB_HOST || configService.get('DB_HOST'),
          port: +process.env.DB_PORT || configService.get('DB_PORT'),
          username: process.env.DB_USERNAME || configService.get('DB_USERNAME'),
          password: process.env.DB_PASSWORD || configService.get('DB_PASSWORD'),
          database: process.env.DB_DATABASE || configService.get('DB_DATABASE'),
          // synchronize: process.env.NODE_ENV === 'production' ? false : configService.get('DB_SYNC'),
          synchronize: true,
          timezone: '+08:00',
          // logging: true, // 可选：打印 SQL
        }
      },
    }),
  ],
  providers: [
    SharedService,
    RedisService,
    {
      inject: [ConfigService],
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          url: configService.get('REDIS_URL'),
        })
        await client.connect()
        return client
      },
    },
    {
      // 全局错误过滤器
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      // 全局拦截器
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      //全局参数校验管道
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true, // 自动类型转换
        validationError: { target: false },
        forbidNonWhitelisted: true, // 禁止多余字段（可选）
        exceptionFactory: (errors) => {
          // 拿到第一个错误
          const firstError = errors[0]
          let message = '参数验证失败'
          if (firstError?.constraints) {
            const constraintValues = Object.values(firstError.constraints)
            if (constraintValues.length > 1) {
              message = constraintValues.join(';')
            } else {
              message = constraintValues[0]
            }
          }
          return new BadRequestException(message)
        },
      }),
    },
  ],
  exports: [SharedService, RedisService],
})
export class SharedModule {}
