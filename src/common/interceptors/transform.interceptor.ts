import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express'; // Додай цей імпорт

export interface Response<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T> | any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    
    // Якщо запит стосується Swagger — просто пропускаємо далі без змін
    if (request.url.includes('api/docs')) {
      return next.handle();
    }

    const statusCode = ctx.getResponse().statusCode;

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}