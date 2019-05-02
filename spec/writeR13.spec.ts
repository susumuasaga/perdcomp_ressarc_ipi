import mongoose from 'mongoose';
import fs from 'fs';
import { NotaFiscalModel, createNotaFiscalModel } from "../createNotaFiscalModel";
import { notasFiscais } from './testDB';
import Entidade from '../Entidade';
import writeR13 from '../writeR13';

describe('writeR13', () => {
    let notaFiscalModel: NotaFiscalModel;
  
    beforeAll(async () => {
      await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      notaFiscalModel = createNotaFiscalModel();
    });
  
    afterAll(async () => {
      mongoose.models = {};
      await mongoose.disconnect();
    });
  
    beforeEach(async () => {
        await notaFiscalModel.deleteMany({});
        await notaFiscalModel.create(notasFiscais);
    });
  
    it('can write file', async () => {
      const entidade: Entidade = { cnpj: '00000000000191', nome: '',
                                   paAno: 2018, paMes: 4 };
      await writeR13(notaFiscalModel, entidade);
      const expected = fs.readFileSync('spec/R13201804.txt', 'utf8');
      const received = fs.readFileSync('R13201804.txt', 'utf8');
      expect(received).toEqual(expected);
    });  
  });
  