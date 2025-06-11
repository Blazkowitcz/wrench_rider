import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BikeModule } from './bike/bike.module';
import { UserBikeModule } from './user_bike/user_bike.module';
import { RepairModule } from './repair/repair.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/WrenchRider'),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    BrandModule,
    UserModule,
    AuthModule,
    BikeModule,
    UserBikeModule,
    RepairModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
