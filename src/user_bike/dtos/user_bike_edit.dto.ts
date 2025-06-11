import { IsString, IsNumber } from 'class-validator';

export class UserBikeEditDto {
  @IsNumber()
  year: number;

  @IsString()
  licence: string;

  @IsNumber()
  mileage: number;
}
