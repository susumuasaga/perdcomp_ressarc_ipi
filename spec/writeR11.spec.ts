import fs from 'fs';
import mongoose from 'mongoose';
import createRegistroIPIModel, { RegistroIPIModel } from "../createRegistroIPIModel";
import { registrosIPI } from './testDB';
import Entidade from '../Entidade';
import writeR11 from '../writeR11';

describe('writeR11', () => {
  let registroIPIModel: RegistroIPIModel;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    registroIPIModel = createRegistroIPIModel();
  });

  afterAll(async () => {
    mongoose.models = {};
    await mongoose.disconnect();
  });

  beforeEach(async () => {
      await registroIPIModel.deleteMany({});
      await registroIPIModel.create(registrosIPI);
  });

  it('can write file', async () => {
    const entidade: Entidade = { cnpj: '00000000000191', nome: '',
                                 paAno: 2018, paMes: 4 };
    await writeR11(registroIPIModel, entidade);
    const expected = fs.readFileSync('spec/R11201804.txt', 'utf8');
    const received = fs.readFileSync('R11201804.txt', 'utf8');
    expect(received).toEqual(expected);
  });  
});
