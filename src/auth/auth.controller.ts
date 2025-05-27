import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAddDto } from '../user/dtos/user_add.dto';
import { UserService } from '../user/user.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { hash, compare } from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  /**
   * Sign up new user
   * @param user
   */
  @Post('signup')
  async signup(@Body() user: UserAddDto): Promise<boolean | HttpException> {
    try {
      const userExisting = await this.usersService.getUserByEmail(user.email);
      if (!userExisting) {
        const hashPass = await hash(user.password, 10);
        const data = { ...user, password: hashPass };
        await this.usersService.create(data);
        return true;
      }
      return new HttpException(
        'User with this email already exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    } catch (error) {
      console.error('Signup error:', error);
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Sign in
   * @param user
   */
  @Post('signin')
  async signin(@Body() user: UserAddDto): Promise<string> {
    try {
      const currentUser = await this.usersService.getUserByEmail(user.email);
      if (currentUser) {
        const validation = await compare(user.password, currentUser.password);
        if (validation) {
          return this.jwtService.sign({
            id: currentUser._id,
            isAdmin: currentUser.isAdmin,
          });
        }
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
