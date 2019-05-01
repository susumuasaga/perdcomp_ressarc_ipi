"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
function readEntidade(fields) {
    assert(fields[1] == '0000', 'readEntidade: Não é registro 0000');
    const beginDate = fields[4];
    const endDate = fields[5];
    const year = Number(beginDate.slice(4));
    assert(Number(endDate.slice(4)) == year, 'readEntidade: Ano Final != Ano Inicial');
    const month = Number(endDate.slice(2, 4));
    assert(Number(endDate.slice(2, 4)) == month, 'readEntidade: Mês Final != Mês Inicial');
    assert(Number(beginDate.slice(0, 2)) == 1, 'readEntidade: Dia inicial != 1');
    return { paAno: year, paMes: month, nome: fields[6], cnpj: fields[7] };
}
exports.default = readEntidade;
