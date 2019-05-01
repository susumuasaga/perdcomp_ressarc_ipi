"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function createNotaFiscalModel() {
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
    NotaFiscalSchema.index({ emitenteCNPJ: 1, num: 1, serie: 1, cfop: 1 }, { unique: true });
    NotaFiscalSchema.index({ paAno: 1, paMes: 1 });
    return mongoose.model('NotaFiscal', NotaFiscalSchema);
}
exports.createNotaFiscalModel = createNotaFiscalModel;
