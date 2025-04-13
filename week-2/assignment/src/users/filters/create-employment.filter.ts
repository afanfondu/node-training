import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class CreateEmploymentFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = exception.getResponse();

    // Extract the error messages
    const errors =
      typeof errorResponse === 'string'
        ? [errorResponse]
        : (errorResponse as any).message;

    const formattedErrors = {};

    if (Array.isArray(errors)) {
      errors.forEach((msg: string) => {
        // Extract field name from the beginning of the message
        const parts = msg.split(' ');
        const field = parts[0];
        console.log(field);

        // Handle specific error types
        if (msg.includes('RATE_OUT_OF_RANGE')) {
          const [_, countryCode, min, max] = msg.split(':');
          formattedErrors['contractorDetails.hourlyRate'] = {
            code: 'RATE_OUT_OF_RANGE',
            allowedRanges: {
              [countryCode]: [parseInt(min), parseInt(max)],
            },
          };
        } else {
          formattedErrors[field] = {
            code: 'VALIDATION_ERROR',
            message: msg.substring(field.length + 1),
          };
        }
      });
    }

    response.status(400).json({ errors: formattedErrors });
  }
}
