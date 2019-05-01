"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readPeriodoApuracao_1 = __importDefault(require("../readPeriodoApuracao"));
describe('readPeriodoApuracao', () => {
    it('can read PeriodoApuracao', () => {
        const line = '|E500|0|01042014|30042014|';
        const periodoApuracao = readPeriodoApuracao_1.default(line.split('|'));
        expect(periodoApuracao.ano).toBe(2014);
        expect(periodoApuracao.mes).toBe(4);
    });
});
