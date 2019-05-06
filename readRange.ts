import readEfdIcmsIpi from "./readEfdIcmsIpi";
import { ParticipanteModel } from "./createParticipanteModel";
import { NotaFiscalModel } from "./createNotaFiscalModel";
import { ApuracaoIPIModel } from "./createApuracaoIPIModel";
import { RegistroIPIModel } from "./createRegistroIPIModel";
import { formatAAAA, formatMM } from "./formatRMais";

export default async function readRange(participanteModel: ParticipanteModel,
                                        notaFiscalModel: NotaFiscalModel,
                                        apuracaoIPIModel: ApuracaoIPIModel,
                                        registroIPIModel: RegistroIPIModel,
                                        path: string,
                                        anoInic: number, mesInic: number,
                                        anoFim: number, mesFim: number) {
    let ano = anoInic;
    let mes = mesInic;
    while (ano<anoFim || mes<=mesFim) {
        await readEfdIcmsIpi(participanteModel, notaFiscalModel,
                             apuracaoIPIModel, registroIPIModel,
                             `${path}/${formatAAAA(ano)}/${formatMM(mes)}.txt`);
        if (mes < 12) {
            mes += 1;
        } else {
            mes = 1;
            ano += 1;
        }
    }
}
