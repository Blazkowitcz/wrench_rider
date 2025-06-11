import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepairService } from './repair.service';
import { RepairController } from './repair.controller';
import { Repair, RepairSchema } from './repair.schema';
import { AuthModule } from '../auth/auth.module';
import { UserBikeModule } from '../user_bike/user_bike.module';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Repair.name, schema: RepairSchema }]),
    AuthModule,
    UserBikeModule,
    InvoiceModule,
  ],
  controllers: [RepairController],
  providers: [RepairService],
})
export class RepairModule {}
