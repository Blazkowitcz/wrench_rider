import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, IsAdminGuard } from '../auth/auth.guard';
import { BrandAddDto } from './dtos/brand_add.dto';
import { Brand } from './brand.schema';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @Post()
  async create(@Body() brandAddDto: BrandAddDto): Promise<Brand> {
    return this.brandService.create(brandAddDto);
  }
}
