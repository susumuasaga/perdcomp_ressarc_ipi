import fs from 'fs';
import util from 'util';
import { NotaFiscalModel, NotaFiscalDoc } from "./createNotaFiscalModel";
import Entidade from "./Entidade";
import formatRMais, { formatAAAA, formatMM, formatXN } from './formatRMais';

export default async function writeR13(
    notaFiscalModel: NotaFiscalModel, entidade: Entidade
): Promise<NotaFiscalDoc[]> {
  const paAno = entidade.paAno;
  const paMes = entidade.paMes;
  const cnpj = entidade.cnpj;
  const notaFiscalDocs = await notaFiscalModel.find()
                          .where('paAno').equals(paAno)
                          .where('paMes').gte(paMes)
                                         .lt(paMes+3)
                          .or([{cfop: /^1/}, {cfop: /^2/}, {cfop: /^3/}])
                          .where('codSituacao').equals(0)
                          .where('ipiCredOuDeb').gt(0)
                          .sort({ emitenteCNPJ: 1, num: 1, serie: 1 });
  const out = fs.createWriteStream(`R13${formatAAAA(paAno)}${formatMM(paMes)}.txt`);
  const writeAsync = util.promisify(out.write).bind(out);
  const endAsync = util.promisify(out.end).bind(out);
  for (let i = 0; i < notaFiscalDocs.length; i++) {
    const d = notaFiscalDocs[i];
    await writeAsync('R13'); //1
    await writeAsync(cnpj);  //2
    await writeAsync('              '); //3
    await writeAsync(cnpj); //4
    await writeAsync(d.emitenteCNPJ); //5
    await writeAsync(formatXN(d.num)); //6
    await writeAsync(d.serie.padEnd(3)); //7
    await writeAsync(d.data); //8
    await writeAsync(d.dataES); //9
    await writeAsync(d.cfop); //10
    await writeAsync(formatRMais(d.total)); //11
    await writeAsync(formatRMais(d.ipiDestacado)); //12
    await writeAsync(formatRMais(d.ipiCredOuDeb)); //13
    await writeAsync('\r\n'); //14
  }
  await endAsync();
  return notaFiscalDocs;
}
