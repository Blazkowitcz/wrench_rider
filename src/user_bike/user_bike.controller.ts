import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserBikeAddDto } from './dtos/user_bike_add.dto';
import { UserBike } from './user_bike.schema';
import { UserBikeService } from './user_bike.service';
import { UserRequest } from '../user/user.schema';

@Controller('userbikes')
export class UserBikeController {
  constructor(private userBikeService: UserBikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userBikeAddDto: UserBikeAddDto): Promise<UserBike> {
    return this.userBikeService.create(userBikeAddDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllBikesFromUser(@Req() request: UserRequest): Promise<UserBike[]> {
    return this.userBikeService.getAllBikesFromUser(request.user.id);
  }
}
