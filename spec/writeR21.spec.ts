import fs from 'fs';
import mongoose from 'mongoose';
import Entidade from '../Entidade';
import writeR21 from '../writeR21';
import createApuracaoIPIModel, { ApuracaoIPIModel } from '../createApuracaoIPIModel';
import { apuracoesIPI } from './testDB';

describe('writeR21', () => {
  let apuracaoIPIModel: ApuracaoIPIModel;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    apuracaoIPIModel = createApuracaoIPIModel();
  });

  afterAll(async () => {
    mongoose.models = {};
    await mongoose.disconnect();
  });

  beforeEach(async () => {
      await apuracaoIPIModel.deleteMany({});
      await apuracaoIPIModel.create(apuracoesIPI);
  });

  it('can write file', async () => {
    const entidade: Entidade = { cnpj: '00000000000191', nome: '',
                                 paAno: 2018, paMes: 4 };
    await writeR21(apuracaoIPIModel, entidade);
    const expected = fs.readFileSync('spec/R21201804.txt', 'utf8');
    const received = fs.readFileSync('R21201804.txt', 'utf8');
    expect(received).toEqual(expected);
  });  
});
