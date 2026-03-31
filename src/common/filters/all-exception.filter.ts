import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { failed } from '../utils/response'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let code = HttpStatus.BAD_REQUEST
    let message: string | string[] = 'Internal server error'

    // HttpException（包括 CustomException）
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res: any = exception.getResponse()
      if (typeof res === 'string') {
        message = res
      } else if (typeof res === 'object') {
        message = res.message || message
        code = res.code || code
      }
    } else if (exception instanceof Error) {
      message = exception.message
    }

    // message 统一成字符串
    if (Array.isArray(message)) {
      message = message.join(', ')
    }

    // 日志
    this.logger.error(`[${Date.now()}] ${request.method} ${request.url} -> ${code} ${message}`)

    // 个人习惯统一返回结构：HTTP 状态码固定 200 切换成 status 即可 ，返回值固定 { code, data, message } code 为业务错误码
    response.status(200).json(failed(code, null, message))
  }
}
