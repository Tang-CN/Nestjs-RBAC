import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomException extends HttpException {
  constructor(message: string, code: number = HttpStatus.BAD_REQUEST, data: any = null) {
    super(
      {
        code,
        data,
        message,
      },
      code,
    )
  }
}
