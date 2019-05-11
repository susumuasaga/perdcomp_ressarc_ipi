import fs from 'fs';
import util from 'util';
import Entidade from "./Entidade";
import formatRMais, { formatMM, formatAAAA } from './formatRMais';
import { ApuracaoIPIModel, ApuracaoIPIDoc } from './createApuracaoIPIModel';

export default async function writeR11(
    apuracaoIPIModel: ApuracaoIPIModel, entidade: Entidade
): Promise<ApuracaoIPIDoc[]> {
  const paAno = entidade.paAno;
  const paMes = entidade.paMes;
  const cnpj = entidade.cnpj;
  const apuracaoIPIDocs = await apuracaoIPIModel
                          .find({ $or: [{ paAno: { $gt: paAno } },
                                        { paAno: paAno,
                                          paMes: { $gte: paMes+3 } }] })
                          .sort({ paAno: 1, paMes: 1 });
  const out = fs.createWriteStream(`R21${formatAAAA(paAno)}${formatMM(paMes)}.txt`);
  const writeAsync = util.promisify(out.write).bind(out);
  const endAsync = util.promisify(out.end).bind(out);
  for (let i = 0; i < apuracaoIPIDocs.length; i++) {
    const d = apuracaoIPIDocs[i];
    await writeAsync('R21'); //1
    await writeAsync(cnpj); //2
    await writeAsync('              '); //3
    await writeAsync(cnpj); //4
    await writeAsync(formatAAAA(d.paAno)); //5
    await writeAsync(formatMM(d.paMes)); //6
    await writeAsync('0'); //7
    await writeAsync('2'); //8
    await writeAsync(formatRMais(d.creditoNacional)); //9
    await writeAsync(formatRMais(d.creditoImportacao)); //10
    await writeAsync(formatRMais(d.estornoDebito)); //11
    await writeAsync(formatRMais(d.creditoPresumido)); //12
    await writeAsync(formatRMais(d.creditoExtemporaneo)); //13
    await writeAsync(formatRMais(d.creditoOutro)); //14
    await writeAsync(formatRMais(d.debitoNacional)); //15
    await writeAsync(formatRMais(d.estornoCredito)); //16
    await writeAsync(formatRMais(d.ressarcimento)); //17
    await writeAsync(formatRMais(d.debitoOutro)); //18
    await writeAsync('\r\n'); //19
  }
  await endAsync();
  return apuracaoIPIDocs;
}
