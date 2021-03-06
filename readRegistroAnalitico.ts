import assert = require("assert");
import NotaFiscal from "./NotaFiscal";
import { NotaFiscalModel, NotaFiscalDoc } from "./createNotaFiscalModel";
import strToInt from "./strToInt";
import { ApuracaoIPIModel } from "./createApuracaoIPIModel";
import ApuracaoIPI from "./ApuracaoIPI";

export default async function readRegistroAnalitico(
    notaFiscalModel: NotaFiscalModel, apuracaoIPIModel: ApuracaoIPIModel,
    notaFiscal: NotaFiscal, fields: string[]
): Promise<NotaFiscalDoc> {
    assert(fields[1] == 'C190', 'readRegistroAnalitico: Não é registro C190');
    notaFiscal.cfop = fields[3];
    const ipi = strToInt(fields[11]);
    const notaFiscalDoc = await notaFiscalModel
                                .findOneAndUpdate(notaFiscal, notaFiscal,
                                                  {
                                                    new: true, upsert: true,
                                                    setDefaultsOnInsert: true
                                                  })
                                .exec();
    notaFiscalDoc.total += strToInt(fields[5]);
    if (ipi !== 0) {
        const apuracaoIPI: ApuracaoIPI = { paAno: notaFiscal.paAno,
                                           paMes: notaFiscal.paMes }
        const apuracaoIPIDoc = await apuracaoIPIModel
                                    .findOneAndUpdate(
                                        apuracaoIPI, apuracaoIPI,
                                        { new: true, upsert: true,
                                          setDefaultsOnInsert: true }
                                    ).exec();
        const cfop1Int = Number(notaFiscal.cfop.substr(0,1));
        if (notaFiscal.codSituacao === 0) {
            if (cfop1Int === 1 || cfop1Int === 2) {
                apuracaoIPIDoc.creditoNacional += ipi;
            } else if (cfop1Int === 3) {
                apuracaoIPIDoc.creditoImportacao += ipi;
            } else if (cfop1Int === 5 || cfop1Int === 6) {
                apuracaoIPIDoc.debitoNacional += ipi;
            } else {
                throw new Error('Exportação não pode ter IPI');
            }
        } else if (notaFiscal.codSituacao === 1) {
            if (1 <= cfop1Int && cfop1Int <= 3) {
                apuracaoIPIDoc.creditoExtemporaneo += ipi;
            } else {
                throw new Error('Não é permitido débito extemporâneo de IPI');
            }
        }
        await apuracaoIPIDoc.save();
        notaFiscalDoc.ipiDestacado += ipi;
        notaFiscalDoc.ipiCredOuDeb += ipi;
    }
    return notaFiscalDoc.save();
}
