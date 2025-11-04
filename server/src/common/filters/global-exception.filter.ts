import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    console.error(exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
        error = exception.name;
      } else if (typeof res === 'object') {
        const body = res as {
          message: string;
          error: string;
        };
        message = body.message || message;
        error = body.error || exception.name;
      }
    } else if (exception instanceof QueryFailedError) {
      const pgError = exception as unknown as {
        code: string;
        message: string;
      };

      console.log(exception);

      switch (pgError.code) {
        case '23505':
          status = HttpStatus.BAD_REQUEST;
          message = 'Duplicate entry violates unique constraint.';
          error = 'Unique Constraint Violation';
          break;
        case '23503':
          status = HttpStatus.BAD_REQUEST;
          message = 'Foreign key constraint violation.';
          error = 'Foreign Key Violation';
          break;
        case '23502':
          status = HttpStatus.BAD_REQUEST;
          message = 'Missing required field (not null constraint).';
          error = 'Not Null Violation';
          break;
        case '22P02':
          status = HttpStatus.BAD_REQUEST;
          message = 'Invalid input id';
          error = 'Invalid Input';
          break;
        default:
          message = pgError.message;
          error = 'Database Error';
          break;
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      error
    });
  }
}
