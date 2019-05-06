import mongoose = require('mongoose');
import createNotaFiscalModel, { NotaFiscalModel }
  from '../createNotaFiscalModel';
import { notasFiscais } from './testDB';

describe('NotaFiscal', function () {
  let NotaFiscaltModel: NotaFiscalModel;

  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    NotaFiscaltModel = createNotaFiscalModel();
  });

  afterAll(function () {
    mongoose.models = {};
    mongoose.disconnect();
  });

  it('can create NotaFiscalModel', async () => {
    await NotaFiscaltModel.deleteMany({});
    await NotaFiscaltModel.create(notasFiscais);
    const NotaFiscalDocs = await NotaFiscaltModel.find().exec();
    expect(NotaFiscalDocs.length).toBe(6);
  });
});
