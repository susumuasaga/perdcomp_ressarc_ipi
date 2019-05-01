import mongoose = require('mongoose');
import { ApuracaoIPIModel , createApuracaoIPIModel }
  from '../createApuracaoIPIModel';
import { apuracoesIPI } from './testDB';

describe('ApuracaoIPI', function () {
  let ApuracaoIPItModel: ApuracaoIPIModel;

  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    ApuracaoIPItModel = createApuracaoIPIModel();
  });

  afterAll(function () {
    mongoose.models = {};
    mongoose.disconnect();
  });

  it('can create ApuracaoIPIModel', async () => {
    // Clear database
    await ApuracaoIPItModel.deleteMany({});
    // Create test data
    await ApuracaoIPItModel.create(apuracoesIPI);
    // retrieve James Hackett id
    const ApuracaoIPIDocs = await ApuracaoIPItModel.find().exec();
    expect(ApuracaoIPIDocs.length).toBe(1);
  });
});
