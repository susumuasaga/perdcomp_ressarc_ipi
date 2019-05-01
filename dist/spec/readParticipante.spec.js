"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createParticipanteModel_1 = require("../createParticipanteModel");
const readParticipante_1 = __importDefault(require("../readParticipante"));
const testDB_1 = require("./testDB");
describe('readParticipante', () => {
    let participanteModel;
    beforeAll(async () => {
        mongoose_1.default.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        participanteModel = createParticipanteModel_1.createParticipanteModel();
        await participanteModel.deleteMany({});
        await participanteModel.create(testDB_1.participantes);
    });
    afterAll(function () {
        mongoose_1.default.models = {};
        mongoose_1.default.disconnect();
    });
    it('can read and create Participante', async () => {
        const line = '|0150|CLI000000009|Dilady Ind. de Confeccoes Ltda|1058|07829401000106||060191759|2304400||Rua Rio Grande do Norte|11||Pan Americano|';
        const participanteDoc = await readParticipante_1.default(participanteModel, line.split('|'));
        expect(participanteDoc.codigo).toBe('CLI000000009');
        expect(participanteDoc.nome).toBe('Dilady Ind. de Confeccoes Ltda');
        expect(participanteDoc.cnpj).toBe('07829401000106');
    });
    it('can read and update Participante', async () => {
        const line = '|0150|CLI000000001|Dilady Ind. de Confeccoes Ltda|1058|07829401000106||060191759|2304400||Rua Rio Grande do Norte|11||Pan Americano|';
        const participanteDoc = await readParticipante_1.default(participanteModel, line.split('|'));
        expect(participanteDoc.codigo).toBe('CLI000000001');
        expect(participanteDoc.nome).toBe('Dilady Ind. de Confeccoes Ltda');
        expect(participanteDoc.cnpj).toBe('07829401000106');
    });
});
