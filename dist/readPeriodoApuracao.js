"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
function readPeriodoApuracao(fields) {
    assert(fields[1] == 'E500', 'readPeriodoApuracao: Não é registro E500');
    assert(fields[2] == '0', 'readPeriodoApuracao: Período de Apuração é Decendial.');
    const beginDate = fields[3];
    const endDate = fields[4];
    const year = Number(beginDate.slice(4));
    assert(Number(endDate.slice(4)) == year, 'readPeriodoApuracao: Ano Final != Ano Inicial');
    const month = Number(endDate.slice(2, 4));
    assert(Number(endDate.slice(2, 4)) == month, 'readPeriodoApuracao: Mês Final != Mês Inicial');
    assert(Number(beginDate.slice(0, 2)) == 1, 'readPeriodoApuracao: Dia inicial != 1');
    return { ano: year, mes: month };
}
exports.default = readPeriodoApuracao;
