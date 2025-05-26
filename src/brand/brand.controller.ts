import { Controller, Get, Post, Body } from '@nestjs/common';
import { BrandAddDto } from './dtos/brand_add.dto';
import { Brand } from './brand.schema';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Post()
  async create(@Body() brandAddDto: BrandAddDto): Promise<Brand> {
    return this.brandService.create(brandAddDto);
  }
}
