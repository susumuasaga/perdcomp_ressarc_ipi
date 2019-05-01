import mongoose = require('mongoose');

export interface RegistroIPIDoc extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  paAno: number;
  paMes: number;
  cfop: string;
  baseCalc: number;
  ipi: number;
  isentasNaoTrib: number;
  outras: number
}

export type RegistroIPIModel = mongoose.Model<RegistroIPIDoc>;

export function createRegistroIPIModel(): RegistroIPIModel {
  const registroIPISchema = new mongoose.Schema({
    paAno: { type: Number, required: true },
    paMes: { type: Number, required: true },
    cfop: { type: String, required: true },
    baseCalc: { type: Number, default: 0 },
    ipi: { type: Number, default: 0},
    isentasNaoTrib: { type: Number, default: 0 },
    outras: { type: Number, default: 0 }
  });
  registroIPISchema.index({ paAno: 1, paMes: 1, cfop: 1 }, { unique: true });
  return mongoose.model<RegistroIPIDoc>('RegistroIPI', registroIPISchema);
}
