import { ApuracaoIPIModel, ApuracaoIPIDoc } from "./createApuracaoIPIModel";
import PeriodoApuracao from "./PeriodoApuracao";
import assert = require("assert");
import strToInt from "./strToInt";
import ApuracaoIPI from "./ApuracaoIPI";

export default async function readAjusteApuracaoIPI(
    apuracaoIPIModel: ApuracaoIPIModel,
    periodoApuracao: PeriodoApuracao,
    fields: string[]
): Promise<ApuracaoIPIDoc> {
    assert(fields[1] == 'E530', 'readAjusteApuracaoIPI: Não é registro E530');
    const apuracaoIPI: ApuracaoIPI = { paAno: periodoApuracao.ano,
                                       paMes: periodoApuracao.mes };
    const apuracaoIPIDoc = await apuracaoIPIModel.findOneAndUpdate(
      apuracaoIPI, apuracaoIPI, { new: true, upsert: true,
                                  setDefaultsOnInsert: true }
    ).exec();
    const valor = strToInt(fields[3]);
    const cod = Number(fields[4]);
    if (cod === 1) {
      apuracaoIPIDoc.estornoDebito += valor;
    } else if (10 <= cod && cod <= 19) {
      apuracaoIPIDoc.creditoPresumido += valor;
    } else if (cod <= 99) {
      apuracaoIPIDoc.creditoOutro += valor;
    } else if (cod === 101) {
      apuracaoIPIDoc.estornoCredito += valor;
    } else if (cod === 103) {
      apuracaoIPIDoc.ressarcimento += valor;
    } else if (cod <= 199) {
      apuracaoIPIDoc.debitoOutro += valor;
    } else {
      throw new Error(`Código de ajuste não reconhecido: ${cod}`);
    }
    return apuracaoIPIDoc.save();
}
