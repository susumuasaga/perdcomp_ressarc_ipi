"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const strToInt_1 = __importDefault(require("./strToInt"));
async function readRegistroIPI(registroIPIModel, periodoApuracao, fields) {
    assert(fields[1] == 'E510', 'readRegistroIPI: Não é registro E510');
    const cfop = fields[2];
    const isentaNaoTrib = (new Set(['02', '03', '04', '52', '53', '54']))
        .has(fields[3]);
    const valorContabil = strToInt_1.default(fields[4]);
    const baseCalc = strToInt_1.default(fields[5]);
    const ipi = strToInt_1.default(fields[6]);
    const registroIPI = { paAno: periodoApuracao.ano,
        paMes: periodoApuracao.mes, cfop: cfop };
    const registroIPIDoc = await registroIPIModel
        .findOneAndUpdate(registroIPI, registroIPI, { new: true,
        upsert: true,
        setDefaultsOnInsert: true })
        .exec();
    registroIPIDoc.baseCalc += baseCalc;
    registroIPIDoc.ipi += ipi;
    if (!isentaNaoTrib) {
        registroIPIDoc.outras += valorContabil - (baseCalc + ipi);
    }
    else {
        registroIPIDoc.isentasNaoTrib += valorContabil - (baseCalc + ipi);
    }
    return registroIPIDoc.save();
}
exports.default = readRegistroIPI;
