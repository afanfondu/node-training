import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformNumbersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertNumbers(data)));
  }
  private convertNumbers(data: any): any {
    console.log(data);
    if (typeof data === 'number') return data.toString();

    if (Array.isArray(data))
      return data.map((item) => this.convertNumbers(item));

    if (typeof data === 'object' && data !== null) {
      const result = {};
      for (const key in data) {
        result[key] = this.convertNumbers(data[key]);
      }
      return result;
    }

    return data;
  }
}
