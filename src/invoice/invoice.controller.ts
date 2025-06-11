import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserRequest } from '../user/user.schema';
import { InvoiceService } from './invoice.service';
import { createReadStream } from 'node:fs';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':invoice/download')
  async downloadInvoice(
    @Req() request: UserRequest,
    @Param('invoice') invoiceId: string,
  ): Promise<StreamableFile | null> {
    const invoice = await this.invoiceService.getInvoiceById(invoiceId);
    if (invoice && invoice.user._id.equals(request.user.id)) {
      const readableStream = createReadStream(
        `${process.env.FILES_LOCATION}/invoices/${invoice.filename}`,
      );
      return new StreamableFile(readableStream, {
        disposition: `inline; filename=${invoice.name}`,
      });
    }
    return null;
  }
}
