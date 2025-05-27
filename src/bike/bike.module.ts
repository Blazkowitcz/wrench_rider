import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { Bike, BikeSchema } from './bike.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bike.name, schema: BikeSchema }]),
    AuthModule,
  ],
  controllers: [BikeController],
  providers: [BikeService],
})
export class BikeModule {}
