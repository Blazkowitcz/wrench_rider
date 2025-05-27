import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, IsAdminGuard } from '../auth/auth.guard';
import { BikeAddDto } from './dtos/bike_add.dto';
import { Bike } from './bike.schema';
import { BikeService } from './bike.service';

@Controller('bikes')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @Post()
  async create(@Body() bikeAddDto: BikeAddDto): Promise<Bike> {
    return this.bikeService.create(bikeAddDto);
  }
}
