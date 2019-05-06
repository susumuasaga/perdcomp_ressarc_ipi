import mongoose = require('mongoose');
import createRegistroIPIModel, { RegistroIPIModel }
  from '../createRegistroIPIModel';
import { registrosIPI } from './testDB';

describe('RegistroIPI', function () {
  let registroIPItModel: RegistroIPIModel;

  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    registroIPItModel = createRegistroIPIModel();
  });

  afterAll(function () {
    mongoose.models = {};
    mongoose.disconnect();
  });

  it('can create RegistroIPIModel', async () => {
    // Clear database
    await registroIPItModel.deleteMany({});
    // Create test data
    await registroIPItModel.create(registrosIPI);
    // retrieve James Hackett id
    const registroIPIDocs = await registroIPItModel.find().exec();
    expect(registroIPIDocs.length).toBe(4);
  });
});
