"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readEntidade_1 = __importDefault(require("../readEntidade"));
describe('readEntidade', () => {
    it('can read Entidade', () => {
        const line = '|0000|012|0|01122018|31122018|BATURRO S CONFECÇÕES E IMPRESSOS LTDA|02352777000140||SP|472010089113|3532405|1723||A|0|';
        const entidade = readEntidade_1.default(line.split('|'));
        expect(entidade.cnpj).toBe('02352777000140');
        expect(entidade.nome).toBe('BATURRO S CONFECÇÕES E IMPRESSOS LTDA');
        expect(entidade.paAno).toBe(2018);
        expect(entidade.paMes).toBe(12);
    });
});
