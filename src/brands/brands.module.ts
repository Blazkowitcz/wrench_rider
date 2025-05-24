import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './brands.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
})
export class BrandsModule {}
