import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { UserBike } from '../user_bike/user_bike.schema';
import { Invoice } from '../invoice/invoice.schema';

export type RepairDocument = HydratedDocument<Repair>;

@Schema({ versionKey: false })
export class Repair {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: UserBike.name,
  })
  userBike: UserBike;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mileage: number;

  @Prop({ required: true })
  date: Date;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: Invoice.name,
  })
  invoice: Invoice;
}

export const RepairSchema = SchemaFactory.createForClass(Repair);
