import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 启用全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // 启用CORS
  app.enableCors()

  // 配置Swagger文档
  const config = new DocumentBuilder()
    .setTitle('RBAC权限管理系统')
    .setDescription('基于NestJS的RBAC权限管理系统API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.APP_PORT || 3000
  await app.listen(port)
  console.log(`应用运行在: http://localhost:${port}`)
  console.log(`API文档地址: http://localhost:${port}/api`)
}
bootstrap()
