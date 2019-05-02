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
async function writeR13(notaFiscalModel, entidade) {
    const paAno = entidade.paAno;
    const paMes = entidade.paMes;
    const cnpj = entidade.cnpj;
    const notaFiscalDocs = await notaFiscalModel.find()
        .where('paAno').equals(paAno)
        .where('paMes').gte(paMes)
        .lt(paMes + 3)
        .or([{ cfop: /^1/ }, { cfop: /^2/ }, { cfop: /^3/ }])
        .where('codSituacao').equals(0)
        .where('ipiCredOuDeb').gt(0)
        .sort({ emitenteCNPJ: 1, num: 1, serie: 1 });
    const out = fs_1.default.createWriteStream(`R13${formatRMais_1.formatAAAA(paAno)}${formatRMais_1.formatMM(paMes)}.txt`);
    const writeAsync = util_1.default.promisify(out.write).bind(out);
    const endAsync = util_1.default.promisify(out.end).bind(out);
    for (let i = 0; i < notaFiscalDocs.length; i++) {
        const d = notaFiscalDocs[i];
        await writeAsync('R13');
        await writeAsync(cnpj);
        await writeAsync('              ');
        await writeAsync(cnpj);
        await writeAsync(d.emitenteCNPJ);
        await writeAsync(formatRMais_1.formatXN(d.num));
        await writeAsync(d.serie.padEnd(3));
        await writeAsync(d.data);
        await writeAsync(d.dataES);
        await writeAsync(d.cfop);
        await writeAsync(formatRMais_1.default(d.total));
        await writeAsync(formatRMais_1.default(d.ipiDestacado));
        await writeAsync(formatRMais_1.default(d.ipiCredOuDeb));
        await writeAsync('\r\n');
    }
    await endAsync();
    return notaFiscalDocs;
}
exports.default = writeR13;
