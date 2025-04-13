import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class CreateUserFilter<T extends BadRequestException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const errorRes = exception.getResponse();
    console.log('errorRes', errorRes);

    const errors =
      typeof errorRes === 'string' ? [errorRes] : errorRes['message'];

    res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }
}
