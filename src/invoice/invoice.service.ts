import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Invoice, InvoiceDocument } from './invoice.schema';
import { InvoiceAddDto } from './dtos/invoice_add.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  async getInvoiceById(id: string): Promise<Invoice | null> {
    return this.invoiceModel.findById(id);
  }

  async addInvoice(invoiceAddDto: InvoiceAddDto): Promise<Invoice> {
    const invoice = new this.invoiceModel(invoiceAddDto);
    return invoice.save();
  }
}
