import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBikeService } from './user_bike.service';
import { UserBikeController } from './user_bike.controller';
import { UserBike, UserBikeSchema } from './user_bike.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBike.name, schema: UserBikeSchema },
    ]),
    AuthModule,
  ],
  controllers: [UserBikeController],
  providers: [UserBikeService],
  exports: [UserBikeService],
})
export class UserBikeModule {}
