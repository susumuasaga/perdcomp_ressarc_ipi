import { RegistroIPIModel, RegistroIPIDoc } from "./createRegistroIPIModel";
import assert = require("assert");
import strToInt from "./strToInt";
import PeriodoApuracao from "./PeriodoApuracao";
import RegistroIPI from "./RegistroIPI";

export default async function readRegistroIPI(
    registroIPIModel: RegistroIPIModel, periodoApuracao: PeriodoApuracao,
    fields: string[]
): Promise<RegistroIPIDoc> {
    assert(fields[1] == 'E510', 'readRegistroIPI: Não é registro E510');
    const cfop = fields[2];
    const isentaNaoTrib = (new Set(['02', '03', '04', '52', '53', '54']))
                          .has(fields[3]);
    const valorContabil = strToInt(fields[4]);
    const baseCalc = strToInt(fields[5]);
    const ipi = strToInt(fields[6]);
    const registroIPI: RegistroIPI = { paAno: periodoApuracao.ano,
                                       paMes: periodoApuracao.mes, cfop: cfop }
    const registroIPIDoc = await registroIPIModel
      .findOneAndUpdate(registroIPI, registroIPI, { new: true,
                                                    upsert: true,
                                                    setDefaultsOnInsert: true })
      .exec();
    registroIPIDoc.baseCalc += baseCalc;
    registroIPIDoc.ipi += ipi;
    if (!isentaNaoTrib) {
        if (valorContabil >= baseCalc+ipi) {
            registroIPIDoc.outras += valorContabil - (baseCalc+ipi);
        }
    } else {
        registroIPIDoc.isentasNaoTrib += valorContabil - (baseCalc+ipi);
    }
    return registroIPIDoc.save();
}
