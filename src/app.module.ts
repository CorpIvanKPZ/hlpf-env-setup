import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './categories/category.entity';
import { Product } from './products/product.entity';
import { User } from './users/user.entity';
import { CreateTables1780269386169 } from './migrations/1780269386169-CreateTables';
import { AddIsActiveToProducts1780269905123 } from './migrations/1780269905123-AddIsActiveToProducts';
import { CreateUsers1780275144015 } from './migrations/1780275144015-CreateUsers';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT as string, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Category, Product, User],
      synchronize: false,
      migrationsRun: true,
      migrations: [
       CreateTables1780269386169,
       AddIsActiveToProducts1780269905123,
       CreateUsers1780275144015,
      ],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT as string, 10),
          },
        }),
        ttl: 60 * 1000,
      }),
    }),
    // Реєструємо їх тут
    CategoriesModule,
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}