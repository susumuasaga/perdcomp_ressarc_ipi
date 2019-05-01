"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
async function readParticipante(participanteModel, fields) {
    assert(fields[1] == '0150', 'readParticipante: Não é registro 0150');
    return participanteModel.findOneAndUpdate({ codigo: fields[2] }, { nome: fields[3], cnpj: fields[5] }, { new: true, upsert: true }).exec();
}
exports.default = readParticipante;
