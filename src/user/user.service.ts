import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserAddDto } from './dtos/user_add.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Create new user
   * @param userAddDto
   */
  async create(userAddDto: UserAddDto): Promise<User> {
    const user = new this.userModel(userAddDto);
    return await user.save();
  }

  /**
   * Get user by its Email address
   * @param email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email });
  }
}
