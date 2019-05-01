"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const strToInt_1 = __importDefault(require("./strToInt"));
async function readAjusteApuracaoIPI(apuracaoIPIModel, periodoApuracao, fields) {
    assert(fields[1] == 'E530', 'readAjusteApuracaoIPI: Não é registro E530');
    const apuracaoIPI = { paAno: periodoApuracao.ano,
        paMes: periodoApuracao.mes };
    const apuracaoIPIDoc = await apuracaoIPIModel.findOneAndUpdate(apuracaoIPI, apuracaoIPI, { new: true, upsert: true,
        setDefaultsOnInsert: true }).exec();
    const valor = strToInt_1.default(fields[3]);
    const cod = Number(fields[4]);
    if (cod === 1) {
        apuracaoIPIDoc.estornoDebito += valor;
    }
    else if (10 <= cod && cod <= 19) {
        apuracaoIPIDoc.creditoPresumido += valor;
    }
    else if (cod <= 99) {
        apuracaoIPIDoc.creditoOutro += valor;
    }
    else if (cod === 101) {
        apuracaoIPIDoc.estornoCredito += valor;
    }
    else if (cod === 103) {
        apuracaoIPIDoc.ressarcimento += valor;
    }
    else if (cod <= 199) {
        apuracaoIPIDoc.debitoOutro += valor;
    }
    else {
        throw new Error(`Código de ajuste não reconhecido: ${cod}`);
    }
    return apuracaoIPIDoc.save();
}
exports.default = readAjusteApuracaoIPI;
