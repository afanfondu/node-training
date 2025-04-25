import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BookNotFoundException } from '../exceptions/book-not-found.exception';
import { Response } from 'express';

@Catch(BookNotFoundException)
export class BookNotFoundFilter<T extends BookNotFoundException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const errorResponse = exception.getResponse();

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : 'message' in errorResponse && errorResponse.message;

    response.status(404).json({
      statusCode: 404,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
