import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Brand } from '../brand/brand.schema';

export type BikeDocument = HydratedDocument<Bike>;

@Schema({ versionKey: false })
export class Bike {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  power: number;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Brand.name,
  })
  brand: Brand;
}

export const BikeSchema = SchemaFactory.createForClass(Bike);
