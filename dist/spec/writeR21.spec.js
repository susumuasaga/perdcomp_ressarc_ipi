"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const writeR21_1 = __importDefault(require("../writeR21"));
const createApuracaoIPIModel_1 = __importDefault(require("../createApuracaoIPIModel"));
const testDB_1 = require("./testDB");
describe('writeR21', () => {
    let apuracaoIPIModel;
    beforeAll(async () => {
        await mongoose_1.default.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        apuracaoIPIModel = createApuracaoIPIModel_1.default();
    });
    afterAll(async () => {
        mongoose_1.default.models = {};
        await mongoose_1.default.disconnect();
    });
    beforeEach(async () => {
        await apuracaoIPIModel.deleteMany({});
        await apuracaoIPIModel.create(testDB_1.apuracoesIPI);
    });
    it('can write file', async () => {
        const entidade = { cnpj: '00000000000191', nome: '',
            paAno: 2018, paMes: 4 };
        await writeR21_1.default(apuracaoIPIModel, entidade);
        const expected = fs_1.default.readFileSync('spec/R21201804.txt', 'utf8');
        const received = fs_1.default.readFileSync('R21201804.txt', 'utf8');
        expect(received).toEqual(expected);
    });
});
