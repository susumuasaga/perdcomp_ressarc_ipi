"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function createRegistroIPIModel() {
    const registroIPISchema = new mongoose.Schema({
        paAno: { type: Number, required: true },
        paMes: { type: Number, required: true },
        cfop: { type: String, required: true },
        baseCalc: { type: Number, default: 0 },
        ipi: { type: Number, default: 0 },
        isentasNaoTrib: { type: Number, default: 0 },
        outras: { type: Number, default: 0 }
    });
    registroIPISchema.index({ paAno: 1, paMes: 1, cfop: 1 }, { unique: true });
    return mongoose.model('RegistroIPI', registroIPISchema);
}
exports.default = createRegistroIPIModel;
