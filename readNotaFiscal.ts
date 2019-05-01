import assert = require("assert");
import Entidade from "./Entidade";
import { ParticipanteModel } from "./createParticipanteModel";
import NotaFiscal from "./NotaFiscal";

export default async function readNotaFiscal(
    entidade: Entidade, participanteModel: ParticipanteModel,
    fields: string[]
): Promise<NotaFiscal> {
    assert(fields[1] == 'C100', 'readNotaFiscal: Não é registro C100');
    let emitenteCNPJ: string;
    if (fields[3] == '0') {
        emitenteCNPJ = entidade.cnpj;
    } else {
        const participanteDoc = await participanteModel
                                .findOne({ codigo: fields[4] }).exec();
        emitenteCNPJ = participanteDoc.cnpj;
    }
    return { emitenteCNPJ: emitenteCNPJ, num: fields[8], serie: fields[7],
             data: fields[10],
             dataES: fields[11],
             codSituacao: Number(fields[6]),
             paAno: entidade.paAno, paMes: entidade.paMes };
}
