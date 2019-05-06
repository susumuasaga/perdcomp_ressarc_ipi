"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createNotaFiscalModel_1 = __importDefault(require("../createNotaFiscalModel"));
const createApuracaoIPIModel_1 = __importDefault(require("../createApuracaoIPIModel"));
const createParticipanteModel_1 = __importDefault(require("../createParticipanteModel"));
const createRegistroIPIModel_1 = __importDefault(require("../createRegistroIPIModel"));
const readEfdIcmsIpi_1 = __importDefault(require("../readEfdIcmsIpi"));
describe('read efd icms ipi', () => {
    let participanteModel;
    let notaFiscalModel;
    let apuracaoIPIModel;
    let registroIPIModel;
    beforeAll(async () => {
        await mongoose_1.default.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        participanteModel = createParticipanteModel_1.default();
        notaFiscalModel = createNotaFiscalModel_1.default();
        apuracaoIPIModel = createApuracaoIPIModel_1.default();
        registroIPIModel = createRegistroIPIModel_1.default();
    });
    afterAll(async () => {
        mongoose_1.default.models = {};
        await mongoose_1.default.disconnect();
    });
    beforeEach(async () => {
        await participanteModel.deleteMany({});
        await notaFiscalModel.deleteMany({});
        await apuracaoIPIModel.deleteMany({});
        await registroIPIModel.deleteMany({});
    });
    it('can read efd icms ipi', async () => {
        await readEfdIcmsIpi_1.default(participanteModel, notaFiscalModel, apuracaoIPIModel, registroIPIModel, 'spec/efdIcmsIpi201804.txt');
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
