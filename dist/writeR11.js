"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const formatRMais_1 = __importStar(require("./formatRMais"));
async function writeR11(registroIPIModel, entidade) {
    const paAno = entidade.paAno;
    const paMes = entidade.paMes;
    const cnpj = entidade.cnpj;
    const registroIPIDocs = await registroIPIModel.find()
        .where('paAno').equals(paAno)
        .where('paMes').gte(paMes)
        .lt(paMes + 3)
        .or([{ cfop: /^1/ }, { cfop: /^2/ }, { cfop: /^3/ }])
        .sort({ paAno: 1, paMes: 1, cfop: 1 });
    const out = fs_1.default.createWriteStream(`R11${formatRMais_1.formatAAAA(paAno)}${formatRMais_1.formatMM(paMes)}.txt`);
    const writeAsync = util_1.default.promisify(out.write).bind(out);
    const endAsync = util_1.default.promisify(out.end).bind(out);
    for (let i = 0; i < registroIPIDocs.length; i++) {
        const d = registroIPIDocs[i];
        await writeAsync('R11');
        await writeAsync(cnpj);
        await writeAsync('              ');
        await writeAsync(cnpj);
        await writeAsync(formatRMais_1.formatAAAA(d.paAno));
        await writeAsync(formatRMais_1.formatMM(d.paMes));
        await writeAsync('0');
        await writeAsync(d.cfop);
        await writeAsync(formatRMais_1.default(d.baseCalc));
        await writeAsync(formatRMais_1.default(d.ipi));
        await writeAsync(formatRMais_1.default(d.isentasNaoTrib));
        await writeAsync(formatRMais_1.default(d.outras));
        await writeAsync('\r\n');
    }
    await endAsync();
    return registroIPIDocs;
}
exports.default = writeR11;
