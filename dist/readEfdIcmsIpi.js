"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const readEntidade_1 = __importDefault(require("./readEntidade"));
const readParticipante_1 = __importDefault(require("./readParticipante"));
const readNotaFiscal_1 = __importDefault(require("./readNotaFiscal"));
const readRegistroAnalitico_1 = __importDefault(require("./readRegistroAnalitico"));
const readPeriodoApuracao_1 = __importDefault(require("./readPeriodoApuracao"));
const readRegistroIPI_1 = __importDefault(require("./readRegistroIPI"));
const readAjusteApuracaoIPI_1 = __importDefault(require("./readAjusteApuracaoIPI"));
async function readEfdIcmsIpi(participanteModel, notaFiscalModel, apuracaoIPIModel, registroIPIModel, path) {
    var e_1, _a;
    let entidade;
    let notaFiscal;
    let periodoApuracao;
    const rl = readline_1.default.createInterface({
        input: fs_1.default.createReadStream(path),
        crlfDelay: Infinity
    });
    try {
        for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), !rl_1_1.done;) {
            const line = rl_1_1.value;
            const fields = line.split('|');
            switch (fields[1]) {
                case '0000':
                    entidade = await readEntidade_1.default(fields);
                    break;
                case '0150':
                    await readParticipante_1.default(participanteModel, fields);
                    break;
                case 'C100':
                    notaFiscal = await readNotaFiscal_1.default(entidade, participanteModel, fields);
                    break;
                case 'C190':
                    await readRegistroAnalitico_1.default(notaFiscalModel, apuracaoIPIModel, notaFiscal, fields);
                    break;
                case 'E500':
                    periodoApuracao = await readPeriodoApuracao_1.default(fields);
                    break;
                case 'E510':
                    await readRegistroIPI_1.default(registroIPIModel, periodoApuracao, fields);
                    break;
                case 'E530':
                    await readAjusteApuracaoIPI_1.default(apuracaoIPIModel, periodoApuracao, fields);
                    break;
                case 'E990':
                    rl.close();
                    return entidade;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) await _a.call(rl_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return entidade;
}
exports.default = readEfdIcmsIpi;
