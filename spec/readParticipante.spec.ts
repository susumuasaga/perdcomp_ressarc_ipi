import mongoose from 'mongoose';
import { createParticipanteModel, ParticipanteModel } from '../createParticipanteModel';
import readParticipante from '../readParticipante';
import { participantes } from './testDB';

describe('readParticipante', () => {
  let participanteModel: ParticipanteModel;

  beforeAll(async () => {
    mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useFindAndModify: false,
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

  it('can read and create Participante', async () => {
    const line = '|0150|CLI000000009|Dilady Ind. de Confeccoes Ltda|1058|07829401000106||060191759|2304400||Rua Rio Grande do Norte|11||Pan Americano|';
    const participanteDoc = await readParticipante(participanteModel,
                                                   line.split('|'));
    expect(participanteDoc.codigo).toBe('CLI000000009');
    expect(participanteDoc.nome).toBe('Dilady Ind. de Confeccoes Ltda');
    expect(participanteDoc.cnpj).toBe('07829401000106');
  });

  it('can read and update Participante', async () => {
    const line = '|0150|CLI000000001|Dilady Ind. de Confeccoes Ltda|1058|07829401000106||060191759|2304400||Rua Rio Grande do Norte|11||Pan Americano|';
    const participanteDoc = await readParticipante(participanteModel,
                                                   line.split('|'));
    expect(participanteDoc.codigo).toBe('CLI000000001');
    expect(participanteDoc.nome).toBe('Dilady Ind. de Confeccoes Ltda');
    expect(participanteDoc.cnpj).toBe('07829401000106');
  });
});
