import { IsString } from 'class-validator';

export class BrandAddDto {
  @IsString()
  name: string;

  @IsString()
  color: string;
}
