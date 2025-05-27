import { IsString, IsNumber } from 'class-validator';

export class BikeAddDto {
  @IsString()
  name: string;

  @IsNumber()
  power: number;
}
