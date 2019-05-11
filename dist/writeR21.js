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
async function writeR11(apuracaoIPIModel, entidade) {
    const paAno = entidade.paAno;
    const paMes = entidade.paMes;
    const cnpj = entidade.cnpj;
    const apuracaoIPIDocs = await apuracaoIPIModel
        .find({ $or: [{ paAno: { $gt: paAno } },
            { paAno: paAno,
                paMes: { $gte: paMes + 3 } }] })
        .sort({ paAno: 1, paMes: 1 });
    const out = fs_1.default.createWriteStream(`R21${formatRMais_1.formatAAAA(paAno)}${formatRMais_1.formatMM(paMes)}.txt`);
    const writeAsync = util_1.default.promisify(out.write).bind(out);
    const endAsync = util_1.default.promisify(out.end).bind(out);
    for (let i = 0; i < apuracaoIPIDocs.length; i++) {
        const d = apuracaoIPIDocs[i];
        await writeAsync('R21');
        await writeAsync(cnpj);
        await writeAsync('              ');
        await writeAsync(cnpj);
        await writeAsync(formatRMais_1.formatAAAA(d.paAno));
        await writeAsync(formatRMais_1.formatMM(d.paMes));
        await writeAsync('0');
        await writeAsync('2');
        await writeAsync(formatRMais_1.default(d.creditoNacional));
        await writeAsync(formatRMais_1.default(d.creditoImportacao));
        await writeAsync(formatRMais_1.default(d.estornoDebito));
        await writeAsync(formatRMais_1.default(d.creditoPresumido));
        await writeAsync(formatRMais_1.default(d.creditoExtemporaneo));
        await writeAsync(formatRMais_1.default(d.creditoOutro));
        await writeAsync(formatRMais_1.default(d.debitoNacional));
        await writeAsync(formatRMais_1.default(d.estornoCredito));
        await writeAsync(formatRMais_1.default(d.ressarcimento));
        await writeAsync(formatRMais_1.default(d.debitoOutro));
        await writeAsync('\r\n');
    }
    await endAsync();
    return apuracaoIPIDocs;
}
exports.default = writeR11;
