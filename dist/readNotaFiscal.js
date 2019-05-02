"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
async function readNotaFiscal(entidade, participanteModel, fields) {
    assert(fields[1] == 'C100', 'readNotaFiscal: Não é registro C100');
    let emitenteCNPJ;
    if (fields[3] == '0') {
        emitenteCNPJ = entidade.cnpj;
    }
    else {
        const participanteDoc = await participanteModel
            .findOne({ codigo: fields[4] }).exec();
        emitenteCNPJ = participanteDoc.cnpj;
    }
    return { emitenteCNPJ: emitenteCNPJ,
        num: Number(fields[8]), serie: fields[7],
        data: fields[10],
        dataES: fields[11],
        codSituacao: Number(fields[6]),
        paAno: entidade.paAno, paMes: entidade.paMes };
}
exports.default = readNotaFiscal;
