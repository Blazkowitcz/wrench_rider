import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserBike, UserBikeDocument } from './user_bike.schema';
import { UserBikeAddDto } from './dtos/user_bike_add.dto';

@Injectable()
export class UserBikeService {
  constructor(
    @InjectModel(UserBike.name) private userBikeModel: Model<UserBikeDocument>,
  ) {}

  /**
   * Add a Bike to a User
   * @param userBikeAddDto
   */
  async create(userBikeAddDto: UserBikeAddDto): Promise<UserBike> {
    const userBike: UserBikeDocument = new this.userBikeModel(userBikeAddDto);
    return await userBike.save();
  }

  /**
   * Get all Bikes from a User
   * @param userId
   */
  async getAllBikesFromUser(userId: string): Promise<UserBike[]> {
    return this.userBikeModel
      .find({ user: userId })
      .populate({
        path: 'bike',
        populate: { path: 'brand', select: { _id: 0 } },
        select: { _id: 0 },
      })
      .exec();
  }
}
