import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RepairAddDto } from './dtos/repair_add.dto';
import { Repair } from './repair.schema';
import { RepairService } from './repair.service';
import { UserRequest } from '../user/user.schema';
import { UserBikeService } from '../user_bike/user_bike.service';
import { InvoiceService } from '../invoice/invoice.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import { randomBytes } from 'node:crypto';

@Controller('repairs')
export class RepairController {
  constructor(
    private readonly repairService: RepairService,
    private readonly userBikeService: UserBikeService,
    private readonly invoiceService: InvoiceService,
  ) {}

  /**
   * Get all Repairs from User Bike
   * @param userBikeId
   * @param request
   */
  @UseGuards(JwtAuthGuard)
  @Get(':userBikeId')
  async getAllRepairsFromUserBike(
    @Param('userBikeId') userBikeId: string,
    @Req() request: UserRequest,
  ): Promise<Repair[]> {
    const userBike = await this.userBikeService.getUserBikeFromUser(
      userBikeId,
      request.user.id,
    );
    if (!userBike) return [];
    return this.repairService.getAllRepairsFromUserBike(userBikeId);
  }

  /**
   * Add a Repair to a User Bike
   * @param request
   * @param repairAddDto
   * @param invoice
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('invoice'))
  async addRepair(
    @Req() request: UserRequest,
    @Body() repairAddDto: RepairAddDto,
    @UploadedFile() invoice: Express.Multer.File,
  ): Promise<Repair> {
    console.log(invoice);
    const repair = await this.repairService.addRepair(repairAddDto);
    const generatedName = randomBytes(16).toString('hex');
    await writeFile(
      `${process.env.FILES_LOCATION}/invoices/${generatedName}`,
      invoice.buffer,
    );
    const newInvoice = await this.invoiceService.addInvoice({
      filename: generatedName,
      name: invoice.originalname,
      user: request.user.id,
    });
    await this.repairService.addInvoiceToRepair(repair, newInvoice);
    return repair;
  }
}
