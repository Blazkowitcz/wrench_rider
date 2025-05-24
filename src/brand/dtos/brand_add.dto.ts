import { IsString } from 'class-validator';

export class BrandsAddDto {
  @IsString()
  name: string;

  @IsString()
  color: string;
}
