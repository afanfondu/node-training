import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class CreatePersonFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = exception.getResponse();
    const errors =
      typeof errorResponse === 'string'
        ? [errorResponse]
        : (errorResponse as any).message;

    const formattedErrors = Array.isArray(errors)
      ? errors.map((msg: string) => {
          // Extract field name
          const fieldMatch = msg.match(/^([a-zA-Z0-9.]+)/);
          const field = fieldMatch ? fieldMatch[1] : 'unknown';

          return {
            field,
            code: msg.includes('INVALID_POSTAL_CODE')
              ? 'INVALID_POSTAL_CODE'
              : 'VALIDATION_ERROR',
          };
        })
      : [{ field: 'unknown', code: 'VALIDATION_ERROR' }];

    response.status(400).json({ errors: formattedErrors });
  }
}
