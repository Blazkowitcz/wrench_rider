import { IsString, IsNumber, IsDate } from 'class-validator';

export class RepairAddDto {
  @IsString()
  userBike: string;

  @IsString()
  name: string;

  @IsNumber()
  mileage: number;

  @IsDate()
  date: Date;
}
