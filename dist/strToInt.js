"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function strToInt(str) {
    return Math.round(Number(str.replace(',', '.')) * 100);
}
exports.default = strToInt;
