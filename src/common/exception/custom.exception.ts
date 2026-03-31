import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomException extends HttpException {
  constructor(err: { code: number; message: string }, data: any = null) {
    super(
      {
        code: err.code,
        data,
        message: err.message,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
