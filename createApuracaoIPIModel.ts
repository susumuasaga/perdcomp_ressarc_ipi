import mongoose = require('mongoose');

export interface ApuracaoIPIDoc extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  paAno: number;
  paMes: number;
  creditoNacional: number;
  creditoImportacao: number;
  estornoDebito: number;
  creditoPresumido: number;
  creditoExtemporaneo: number;
  creditoOutro: number;
  debitoNacional: number;
  estornoCredito: number;
  ressarcimento: number;
  debitoOutro: number
}

export type ApuracaoIPIModel = mongoose.Model<ApuracaoIPIDoc>;

export default function createApuracaoIPIModel(): ApuracaoIPIModel {
  const apuracaoIPISchema = new mongoose.Schema({
    paAno: { type: Number, required: true },
    paMes: { type: Number, required: true },
    creditoNacional: { type: Number, default: 0 },
    creditoImportacao: { type: Number, default: 0 },
    estornoDebito: { type: Number, default: 0 },
    creditoPresumido: { type: Number, default: 0 },
    creditoExtemporaneo: { type: Number, default: 0 },
    creditoOutro: { type: Number, default: 0 },
    debitoNacional: { type: Number, default: 0 },
    estornoCredito: { type: Number, default: 0 },
    ressarcimento: { type: Number, default: 0 },
    debitoOutro: { type: Number, default: 0 }
  });
  apuracaoIPISchema.index({ paAno: 1, paMes: 1 }, { unique: true });
  return mongoose.model<ApuracaoIPIDoc>('ApuracaoIPI', apuracaoIPISchema);
}
