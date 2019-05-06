import mongoose from 'mongoose';
import createNotaFiscalModel, { NotaFiscalModel } from "../createNotaFiscalModel";
import createApuracaoIPIModel, { ApuracaoIPIModel } from "../createApuracaoIPIModel";
import createParticipanteModel, { ParticipanteModel } from "../createParticipanteModel";
import createRegistroIPIModel, { RegistroIPIModel } from "../createRegistroIPIModel";
import readEfdIcmsIpi from '../readEfdIcmsIpi';

describe('read efd icms ipi', () => {
    let participanteModel: ParticipanteModel;
    let notaFiscalModel: NotaFiscalModel;
    let apuracaoIPIModel: ApuracaoIPIModel;
    let registroIPIModel: RegistroIPIModel;
  
    beforeAll(async () => {
      await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      participanteModel = createParticipanteModel();
      notaFiscalModel = createNotaFiscalModel();
      apuracaoIPIModel = createApuracaoIPIModel();
      registroIPIModel = createRegistroIPIModel();
    });
  
    afterAll(async () => {
      mongoose.models = {};
      await mongoose.disconnect();
    });
  
    beforeEach(async () => {
      await participanteModel.deleteMany({});
      await notaFiscalModel.deleteMany({});
      await apuracaoIPIModel.deleteMany({});
      await registroIPIModel.deleteMany({});
    });
  
    it('can read efd icms ipi', async () => {
      await readEfdIcmsIpi(participanteModel, notaFiscalModel, apuracaoIPIModel,
                           registroIPIModel, 'spec/efdIcmsIpi201804.txt');
      const numParticipantes = await participanteModel.find()
                               .estimatedDocumentCount();
      expect(numParticipantes).toBe(3);
      const numNotaFiscais = await notaFiscalModel.find()
                             .estimatedDocumentCount();
      expect(numNotaFiscais).toBe(6);
      const apuracaoIPIDocs = await apuracaoIPIModel.find().exec();
      expect(apuracaoIPIDocs.length).toBe(1);
      expect(apuracaoIPIDocs[0].estornoDebito).toBe(10000);
      const numRegistrosIPI = await registroIPIModel.find()
                                   .estimatedDocumentCount();
      expect(numRegistrosIPI).toBe(4);
    });
  });
  