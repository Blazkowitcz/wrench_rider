import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bike, BikeDocument } from './bike.schema';
import { BikeAddDto } from './dtos/bike_add.dto';

@Injectable()
export class BikeService {
  constructor(
    @InjectModel(Bike.name) private readonly bikeModel: Model<BikeDocument>,
  ) {}

  async create(bikeAddDto: BikeAddDto): Promise<Bike> {
    const bike = new this.bikeModel(bikeAddDto);
    return await bike.save();
  }
}
