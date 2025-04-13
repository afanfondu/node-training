import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { VerifyApiKeyMiddleware } from './middlewares/verify-api-key.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleware)
      .forRoutes('admin')
      .apply(VerifyApiKeyMiddleware)
      .forRoutes({ path: 'reports', method: RequestMethod.GET });
  }
}
