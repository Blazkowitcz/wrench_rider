import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Repair, RepairDocument } from './repair.schema';
import { RepairAddDto } from './dtos/repair_add.dto';
import { FIELDS } from '../constants';
import { Invoice } from '../invoice/invoice.schema';

@Injectable()
export class RepairService {
  constructor(
    @InjectModel(Repair.name)
    private readonly repairModel: Model<RepairDocument>,
  ) {}

  /**
   * Create new Repair
   * @param repairAddDto
   */
  async create(repairAddDto: RepairAddDto): Promise<Repair> {
    const repair = new this.repairModel(repairAddDto);
    return repair.save();
  }

  /**
   * Get all Repairs from User Bike
   * @param userBike
   */
  async getAllRepairsFromUserBike(userBike: string): Promise<Repair[]> {
    return this.repairModel
      .find({ userBike: userBike })
      .select(`-${FIELDS.USER_BIKE}`)
      .populate('invoice')
      .exec();
  }

  /**
   * Add a repair to a User Bike
   * @param repairAddDto
   */
  async addRepair(repairAddDto: RepairAddDto): Promise<Repair> {
    const repair: RepairDocument = new this.repairModel(repairAddDto);
    return await repair.save();
  }

  async addInvoiceToRepair(repair: Repair, invoice: Invoice): Promise<boolean> {
    try {
      repair.invoice = invoice;
      await (repair as RepairDocument).save();
      return true;
    } catch (error) {
      console.error('Failed to add invoice to repair:', error);
      return false;
    }
  }
}
