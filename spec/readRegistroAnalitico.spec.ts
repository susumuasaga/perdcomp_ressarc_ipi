import mongoose from 'mongoose';
import { notasFiscais, apuracoesIPI } from './testDB';
import { NotaFiscalModel, createNotaFiscalModel } from '../createNotaFiscalModel';
import NotaFiscal from '../NotaFiscal';
import readRegistroAnalitico from '../readRegistroAnalitico';
import { ApuracaoIPIModel, createApuracaoIPIModel } from '../createApuracaoIPIModel';
import ApuracaoIPI from '../ApuracaoIPI';

describe('readRegistro', () => {
  let notaFiscalModel: NotaFiscalModel;
  let apuracaoIPIModel: ApuracaoIPIModel;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    notaFiscalModel = createNotaFiscalModel();
    apuracaoIPIModel = createApuracaoIPIModel();
  });

  afterAll(async () => {
    mongoose.models = {};
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await notaFiscalModel.deleteMany({});
    await notaFiscalModel.create(notasFiscais);
    await apuracaoIPIModel.deleteMany({});
    await apuracaoIPIModel.create(apuracoesIPI);
  });

  it('can read and create registro analítico, credito importação',
     async () => {
    const notaFiscal: NotaFiscal = { emitenteCNPJ: '00000000000191',
                                     num: '2', serie: '1',
                                     data: '01042014',
                                     dataES: '02042014',
                                     codSituacao: 0,
                                     paAno: 2014, paMes: 4 }
    const line = '|C190|100|3101|18,00|9768,61|12860,41|2314,88|0,00|0,00|0,00|453,56||';
    const notaFiscalDoc = await readRegistroAnalitico(notaFiscalModel,
                                                      apuracaoIPIModel,
                                                      notaFiscal,
                                                      line.split('|'));
    expect(notaFiscalDoc.emitenteCNPJ).toBe('00000000000191');
    expect(notaFiscalDoc.num).toBe('2');
    expect(notaFiscalDoc.serie).toBe('1');
    expect(notaFiscalDoc.cfop).toBe('3101');
    expect(notaFiscalDoc.total).toBe(976861);
    expect(notaFiscalDoc.ipiDestacado).toBe(45356);
    expect(notaFiscalDoc.ipiCredOuDeb).toBe(45356);
    const apuracaoIPI: ApuracaoIPI = { paAno: 2014, paMes: 4 };
    const apuracaoIPIDoc = await apuracaoIPIModel.findOne(apuracaoIPI);
    expect(apuracaoIPIDoc.creditoImportacao).toBe(45356);
  });

  it('can read and update registro analítico, credito nacional', async () => {
    const notaFiscal: NotaFiscal = { emitenteCNPJ: '11111111000191',
                                     num: '1', serie: '1',
                                     data: '01042018',
                                     dataES: '01042018',
                                     codSituacao: 0,
                                     paAno: 2018, paMes: 4 }
    const line = '|C190|100|1101|18,00|9768,61|12860,41|2314,88|0,00|0,00|0,00|453,56||';
    const notaFiscalDoc = await readRegistroAnalitico(notaFiscalModel,
                                                      apuracaoIPIModel,
                                                      notaFiscal,
                                                      line.split('|'));
    expect(notaFiscalDoc.emitenteCNPJ).toBe('11111111000191');
    expect(notaFiscalDoc.num).toBe('1');
    expect(notaFiscalDoc.serie).toBe('1');
    expect(notaFiscalDoc.cfop).toBe('1101');
    expect(notaFiscalDoc.total).toBe(1086861);
    expect(notaFiscalDoc.ipiDestacado).toBe(55356);
    expect(notaFiscalDoc.ipiCredOuDeb).toBe(55356);
    const apuracaoIPI: ApuracaoIPI = { paAno: 2018, paMes: 4 };
    const apuracaoIPIDoc = await apuracaoIPIModel.findOne(apuracaoIPI);
    expect(apuracaoIPIDoc.creditoNacional).toBe(60118);
    expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
  });

  it('can read and create registro analítico, credito extemporâneo',
     async () => {
    const notaFiscal: NotaFiscal = { emitenteCNPJ: '00000000000191',
                                     num: '2', serie: '1',
                                     data: '01042014',
                                     dataES: '02042014',
                                     codSituacao: 1,
                                     paAno: 2014, paMes: 4 }
    const line = '|C190|100|3101|18,00|9768,61|12860,41|2314,88|0,00|0,00|0,00|453,56||';
    const notaFiscalDoc = await readRegistroAnalitico(notaFiscalModel,
                                                      apuracaoIPIModel,
                                                      notaFiscal,
                                                      line.split('|'));
    expect(notaFiscalDoc.emitenteCNPJ).toBe('00000000000191');
    expect(notaFiscalDoc.num).toBe('2');
    expect(notaFiscalDoc.serie).toBe('1');
    expect(notaFiscalDoc.cfop).toBe('3101');
    expect(notaFiscalDoc.total).toBe(976861);
    expect(notaFiscalDoc.ipiDestacado).toBe(45356);
    expect(notaFiscalDoc.ipiCredOuDeb).toBe(45356);
    const apuracaoIPI: ApuracaoIPI = { paAno: 2014, paMes: 4 };
    const apuracaoIPIDoc = await apuracaoIPIModel.findOne(apuracaoIPI);
    expect(apuracaoIPIDoc.creditoExtemporaneo).toBe(45356);
  });

  it('can read and update registro analítico, debito nacional', async () => {
    const notaFiscal: NotaFiscal = { emitenteCNPJ: '00000000000191',
                                     num: '1', serie: '1',
                                     data: '01042018',
                                     dataES: '01042018',
                                     codSituacao: 0,
                                     paAno: 2018, paMes: 4 }
    const line = '|C190|000|5101|18,00|3522,75|3355,00|603,90|0,00|0,00|0,00|167,75||';
    const notaFiscalDoc = await readRegistroAnalitico(notaFiscalModel,
                                                      apuracaoIPIModel,
                                                      notaFiscal,
                                                      line.split('|'));
    expect(notaFiscalDoc.emitenteCNPJ).toBe('00000000000191');
    expect(notaFiscalDoc.num).toBe('1');
    expect(notaFiscalDoc.serie).toBe('1');
    expect(notaFiscalDoc.cfop).toBe('5101');
    expect(notaFiscalDoc.total).toBe(462275);
    expect(notaFiscalDoc.ipiDestacado).toBe(26775);
    expect(notaFiscalDoc.ipiCredOuDeb).toBe(26775);
    const apuracaoIPI: ApuracaoIPI = { paAno: 2018, paMes: 4 };
    const apuracaoIPIDoc = await apuracaoIPIModel.findOne(apuracaoIPI);
    expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
    expect(apuracaoIPIDoc.debitoNacional).toBe(26775);
  });
});
