import mongoose from 'mongoose';
import { ApuracaoIPIModel, createApuracaoIPIModel } from "../createApuracaoIPIModel";
import { apuracoesIPI } from './testDB';
import PeriodoApuracao from '../PeriodoApuracao';
import readAjusteApuracaoIPI from '../readAjusteApuracaoIPI';

describe('readRegistro', () => {
  let apuracaoIPIModel: ApuracaoIPIModel;
  let periodoApuracao: PeriodoApuracao;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    apuracaoIPIModel = createApuracaoIPIModel();
    periodoApuracao = { ano: 2018, mes: 4 }
  });

  afterAll(async () => {
    mongoose.models = {};
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await apuracaoIPIModel.deleteMany({});
    await apuracaoIPIModel.create(apuracoesIPI);
  });

  it('can read and update ApuracaoIPI, extorno de débito',
      async () => {
    const line = '|E530|1|100,00|001|9|||';
    const apuracaoIPIDoc = await readAjusteApuracaoIPI(apuracaoIPIModel,
                                                       periodoApuracao,
                                                       line.split('|'));
    expect(apuracaoIPIDoc.paAno).toBe(2018);
    expect(apuracaoIPIDoc.paMes).toBe(4);
    expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
    expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
    expect(apuracaoIPIDoc.estornoDebito).toBe(10000);
  });

  it('can read and update ApuracaoIPI, crédito presumido',
      async () => {
    const line = '|E530|1|100,00|010|9|||';
    const apuracaoIPIDoc = await readAjusteApuracaoIPI(apuracaoIPIModel,
                                                       periodoApuracao,
                                                       line.split('|'));
    expect(apuracaoIPIDoc.paAno).toBe(2018);
    expect(apuracaoIPIDoc.paMes).toBe(4);
    expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
    expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
    expect(apuracaoIPIDoc.creditoPresumido).toBe(10000);
  });

  it('can read and update ApuracaoIPI, crédito presumido',
      async () => {
    const line = '|E530|1|100,00|010|9|||';
    const apuracaoIPIDoc = await readAjusteApuracaoIPI(apuracaoIPIModel,
                                                       periodoApuracao,
                                                       line.split('|'));
    expect(apuracaoIPIDoc.paAno).toBe(2018);
    expect(apuracaoIPIDoc.paMes).toBe(4);
    expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
    expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
    expect(apuracaoIPIDoc.creditoPresumido).toBe(10000);
  });

  it('can read and update ApuracaoIPI, crédito outro',
      async () => {
    const line = '|E530|1|100,00|002|9|||';
    const apuracaoIPIDoc = await readAjusteApuracaoIPI(apuracaoIPIModel,
                                                       periodoApuracao,
                                                       line.split('|'));
    expect(apuracaoIPIDoc.paAno).toBe(2018);
    expect(apuracaoIPIDoc.paMes).toBe(4);
    expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
    expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
    expect(apuracaoIPIDoc.creditoOutro).toBe(10000);
  });

  it('can read and update ApuracaoIPI, estorno crédito',
      async () => {
    const line = '|E530|1|100,00|101|9|||';
    const apuracaoIPIDoc = await readAjusteApuracaoIPI(apuracaoIPIModel,
                                                       periodoApuracao,
                                                       line.split('|'));
    expect(apuracaoIPIDoc.paAno).toBe(2018);
    expect(apuracaoIPIDoc.paMes).toBe(4);
    expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
    expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
    expect(apuracaoIPIDoc.estornoCredito).toBe(10000);
  });

  it('can read and update ApuracaoIPI, ressarcimento',
      async () => {
    const line = '|E530|1|100,00|103|9|||';
    const apuracaoIPIDoc = await readAjusteApuracaoIPI(apuracaoIPIModel,
                                                       periodoApuracao,
                                                       line.split('|'));
    expect(apuracaoIPIDoc.paAno).toBe(2018);
    expect(apuracaoIPIDoc.paMes).toBe(4);
    expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
    expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
    expect(apuracaoIPIDoc.ressarcimento).toBe(10000);
  });

  it('can read and update ApuracaoIPI, debito Outro',
      async () => {
    const line = '|E530|1|100,00|102|9|||';
    const apuracaoIPIDoc = await readAjusteApuracaoIPI(apuracaoIPIModel,
                                                       periodoApuracao,
                                                       line.split('|'));
    expect(apuracaoIPIDoc.paAno).toBe(2018);
    expect(apuracaoIPIDoc.paMes).toBe(4);
    expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
    expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
    expect(apuracaoIPIDoc.debitoOutro).toBe(10000);
  });
});
  