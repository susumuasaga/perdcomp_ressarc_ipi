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
    let participanteCNPJ: string;
    if (fields[4] != '') {
        const participanteDoc = await (participanteModel.findOne({ codigo: fields[4] })
        .exec());
        participanteCNPJ = participanteDoc.cnpj;
    } else {
        participanteCNPJ = '';
    }
    if (fields[3] == '0' || fields[4] == '') {
        emitenteCNPJ = entidade.cnpj;
    } else {
        emitenteCNPJ = participanteCNPJ;
    }
    return { emitenteCNPJ: emitenteCNPJ,
             participanteCNPJ: participanteCNPJ,
             num: Number(fields[8]), serie: fields[7],
             data: fields[10],
             dataES: fields[11],
             codSituacao: Number(fields[6]),
             paAno: entidade.paAno, paMes: entidade.paMes };
}
