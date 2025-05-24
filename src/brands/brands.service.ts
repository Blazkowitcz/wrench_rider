import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './brands.schema';
import { BrandsAddDto } from './dtos/brands_add.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<BrandDocument>,
  ) {}

  /**
   * Create new Brand
   * @param brandAddDto
   */
  async create(brandAddDto: BrandsAddDto): Promise<Brand> {
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
