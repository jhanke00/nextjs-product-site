import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './internal/module/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:admin@localhost:27017/product_api?authSource=admin',
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
