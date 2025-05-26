import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './brand.schema';
import { BrandAddDto } from './dtos/brand_add.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<BrandDocument>,
  ) {}

  /**
   * Create new Brand
   * @param brandAddDto
   */
  async create(brandAddDto: BrandAddDto): Promise<Brand> {
    const brand = new this.brandModel(brandAddDto);
    return brand.save();
  }

  /**
   * Get all Brands
   */
  async findAll(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }
}
