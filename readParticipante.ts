import assert = require("assert");
import { ParticipanteModel, ParticipanteDoc } from "./createParticipanteModel";

export default async function readParticipante(participanteModel: ParticipanteModel,
                                         fields: string[]) {
    assert(fields[1] == '0150', 'readParticipante: Não é registro 0150');
    return participanteModel.findOneAndUpdate({ codigo: fields[2] },
                                              { nome: fields[3], cnpj: fields[5] },
                                              { new: true, upsert: true }).exec();
}
