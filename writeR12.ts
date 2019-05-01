import fs from 'fs';
import util from 'util';
import { RegistroIPIModel, RegistroIPIDoc } from "./createRegistroIPIModel";
import Entidade from "./Entidade";
import formatRMais, { formatMM, formatAAAA } from './formatRMais';

export default async function writeR12(
    registroIPIModel: RegistroIPIModel, entidade: Entidade
): Promise<RegistroIPIDoc[]> {
  const paAno = entidade.paAno;
  const paMes = entidade.paMes;
  const cnpj = entidade.cnpj;
  const registroIPIDocs = await registroIPIModel.find()
                          .where('paAno').equals(paAno)
                          .where('paMes').gte(paMes)
                                         .lt(paMes+3)
                          .or([{cfop: /^5/}, {cfop: /^6/}, {cfop: /^7/}])
                          .sort({paAno: 1, paMes: 1, cfop: 1});
  const out = fs.createWriteStream(`R12${formatAAAA(paAno)}${formatMM(paMes)}.txt`);
  const writeAsync = util.promisify(out.write).bind(out);
  const endAsync = util.promisify(out.end).bind(out);
  for (let i = 0; i < registroIPIDocs.length; i++) {
    const d = registroIPIDocs[i];
    await writeAsync('R12');
    await writeAsync(cnpj);
    await writeAsync('              ');
    await writeAsync(cnpj);
    await writeAsync(formatAAAA(d.paAno));
    await writeAsync(formatMM(d.paMes));
    await writeAsync('0');
    await writeAsync(d.cfop);
    await writeAsync(formatRMais(d.baseCalc));
    await writeAsync(formatRMais(d.ipi));
    await writeAsync(formatRMais(d.isentasNaoTrib));
    await writeAsync(formatRMais(d.outras));
    await writeAsync('\r\n');
  }
  await endAsync();
  return registroIPIDocs;
}