import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { Bike } from '../bike/bike.schema';

export type UserBikeDocument = HydratedDocument<UserBike>;

@Schema({ versionKey: false })
export class UserBike {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Bike.name,
  })
  bike: Bike;

  @Prop({ required: true })
  year: number;

  @Prop({ required: false })
  licence: string;

  @Prop({ required: true })
  mileage: number;
}

export const UserBikeSchema = SchemaFactory.createForClass(UserBike);
