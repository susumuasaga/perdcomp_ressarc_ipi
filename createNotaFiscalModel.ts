import mongoose = require('mongoose');

export interface NotaFiscalDoc extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  emitenteCNPJ: string;
  num: string;
  serie: string;
  cfop: string;
  data: string;
  dataES: string;
  total: number;
  ipiDestacado: number;
  ipiCredOuDeb: number;
  codSituacao: number;
  paAno: number;
  paMes: number;
}

export type NotaFiscalModel = mongoose.Model<NotaFiscalDoc>;

export function createNotaFiscalModel(): NotaFiscalModel {
  const NotaFiscalSchema = new mongoose.Schema({
    paAno: { type: Number, required: true },
    paMes: { type: Number, required: true },
    cfop: { type: String, required: true },
    emitenteCNPJ: { type: String, required: true },
    num: { type: String, required: true },
    serie: { type: String, required: true },
    data: { type: String, required: true },
    dataES: { type: String, required: true },
    total: { type: Number, default: 0 },
    ipiDestacado: { type: Number, default: 0 },
    ipiCredOuDeb: { type: Number, default: 0 },
    codSituacao: { type: Number, required: true }
  });
  NotaFiscalSchema.index({ emitenteCNPJ: 1, num: 1, serie: 1, cfop: 1 },
                         { unique: true });
  NotaFiscalSchema.index({ paAno: 1, paMes: 1 });
  return mongoose.model<NotaFiscalDoc>('NotaFiscal', NotaFiscalSchema);
}
