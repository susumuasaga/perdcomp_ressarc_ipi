"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function createApuracaoIPIModel() {
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
    return mongoose.model('ApuracaoIPI', apuracaoIPISchema);
}
exports.default = createApuracaoIPIModel;
