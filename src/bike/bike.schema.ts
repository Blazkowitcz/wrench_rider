import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BikeDocument = HydratedDocument<Bike>;

@Schema()
export class Bike {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  power: number;
}

export const BikeSchema = SchemaFactory.createForClass(Bike);
