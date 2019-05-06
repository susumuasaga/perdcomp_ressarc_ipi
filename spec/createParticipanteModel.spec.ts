import mongoose = require('mongoose');
import createParticipanteModel, { ParticipanteModel }
  from '../createParticipanteModel';
import { participantes } from './testDB';

describe('Participante', function () {
  let participanteModel: ParticipanteModel;

  beforeAll(async () => {
    mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    participanteModel = createParticipanteModel();
    await participanteModel.deleteMany({});
    await participanteModel.create(participantes);
  });

  afterAll(function () {
    mongoose.models = {};
    mongoose.disconnect();
  });

  it('can create ParticipanteModel', async () => {
    const participanteDocs = await participanteModel.find().exec();
    expect(participanteDocs.length).toBe(3);
  });
});
