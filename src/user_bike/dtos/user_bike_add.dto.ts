import { IsString, IsNumber } from 'class-validator';

export class UserBikeAddDto {
  @IsString()
  user: string;

  @IsString()
  bike: string;

  @IsNumber()
  year: number;

  @IsString()
  licence: string;

  @IsNumber()
  mileage: number;
}
