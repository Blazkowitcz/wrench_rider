import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ versionKey: false })
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
