import { IsString } from 'class-validator';

export class InvoiceAddDto {
  @IsString()
  filename: string;

  @IsString()
  name: string;

  @IsString()
  user: string;
}
