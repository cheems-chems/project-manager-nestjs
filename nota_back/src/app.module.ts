import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import typeorm from './config/typeorm.config'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    UserModule,
    ProjectModule,
    TaskModule,
    AuthModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h'},
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter, // Registra el filtro de excepciones
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer){
  //   consumer
  //   .apply(LoggingMiddleware)
  //   .forRoutes("*")
  // }
}
