import fs from 'fs';
import readline from 'readline';
import Entidade from "./Entidade";
import { ApuracaoIPIModel } from "./createApuracaoIPIModel";
import { RegistroIPIModel } from "./createRegistroIPIModel";
import { ParticipanteModel } from "./createParticipanteModel";
import { NotaFiscalModel } from "./createNotaFiscalModel";
import readEntidade from './readEntidade';
import readParticipante from './readParticipante';
import readNotaFiscal from './readNotaFiscal';
import readRegistroAnalitico from './readRegistroAnalitico';
import readPeriodoApuracao from './readPeriodoApuracao';
import readRegistroIPI from './readRegistroIPI';
import readAjusteApuracaoIPI from './readAjusteApuracaoIPI';
import { once } from 'events';
import NotaFiscal from './NotaFiscal';
import PeriodoApuracao from './PeriodoApuracao';

export default async function readEfdIcmsIpi(
    participanteModel: ParticipanteModel, notaFiscalModel: NotaFiscalModel,
    apuracaoIPIModel: ApuracaoIPIModel, registroIPIModel: RegistroIPIModel,
    path: string
): Promise<Entidade> {
    let entidade: Entidade;
    let notaFiscal: NotaFiscal;
    let periodoApuracao: PeriodoApuracao;
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        console.log('line =', line);
        const fields = line.split('|');
        switch (fields[1]) {
            case '0000':
                entidade = await readEntidade(fields);
                break;
            case '0150':
                await readParticipante(participanteModel, fields);
                break;
            case 'C100':
                notaFiscal = await readNotaFiscal(entidade, participanteModel,
                                                  fields);
                break;
            case 'C190':
                await readRegistroAnalitico(notaFiscalModel, apuracaoIPIModel,
                                            notaFiscal, fields);
                break;
            case 'E500':
                periodoApuracao = await readPeriodoApuracao(fields);
                break;
            case 'E510':
                await readRegistroIPI(registroIPIModel, periodoApuracao,
                                      fields);
                break;
            case 'E530':
                await readAjusteApuracaoIPI(apuracaoIPIModel, periodoApuracao,
                                            fields);
                break;
            case 'E990':
                rl.close();
                return entidade;
        }
    }
    return entidade;
}
