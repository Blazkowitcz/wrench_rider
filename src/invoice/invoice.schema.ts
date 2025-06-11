import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({ versionKey: false })
export class Invoice {
  _id: Types.ObjectId;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
