"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readEfdIcmsIpi_1 = __importDefault(require("./readEfdIcmsIpi"));
const formatRMais_1 = require("./formatRMais");
async function readRange(participanteModel, notaFiscalModel, apuracaoIPIModel, registroIPIModel, path, anoInic, mesInic, anoFim, mesFim) {
    let ano = anoInic;
    let mes = mesInic;
    while (ano < anoFim || mes <= mesFim) {
        await readEfdIcmsIpi_1.default(participanteModel, notaFiscalModel, apuracaoIPIModel, registroIPIModel, `${path}/${formatRMais_1.formatAAAA(ano)}/${formatRMais_1.formatMM(mes)}.txt`);
        if (mes < 12) {
            mes += 1;
        }
        else {
            mes = 1;
            ano += 1;
        }
    }
}
exports.default = readRange;
