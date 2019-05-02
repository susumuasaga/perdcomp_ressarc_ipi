"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const numeral_1 = __importDefault(require("numeral"));
function formatRMais(n) {
    return numeral_1.default(n).format('00000000000000');
}
exports.default = formatRMais;
function formatMM(n) {
    return numeral_1.default(n).format('00');
}
exports.formatMM = formatMM;
function formatAAAA(n) {
    return numeral_1.default(n).format('0000');
}
exports.formatAAAA = formatAAAA;
function formatXN(n) {
    return numeral_1.default(n).format('000000000');
}
exports.formatXN = formatXN;
