"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const createNotaFiscalModel_1 = __importDefault(require("../createNotaFiscalModel"));
const testDB_1 = require("./testDB");
const writeR15_1 = __importDefault(require("../writeR15"));
describe('writeR15', () => {
    let notaFiscalModel;
    beforeAll(async () => {
        await mongoose_1.default.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        notaFiscalModel = createNotaFiscalModel_1.default();
    });
    afterAll(async () => {
        mongoose_1.default.models = {};
        await mongoose_1.default.disconnect();
    });
    beforeEach(async () => {
        await notaFiscalModel.deleteMany({});
        await notaFiscalModel.create(testDB_1.notasFiscais);
    });
    it('can write file', async () => {
        const entidade = { cnpj: '00000000000191', nome: '',
            paAno: 2018, paMes: 4 };
        await writeR15_1.default(notaFiscalModel, entidade);
        const expected = fs_1.default.readFileSync('spec/R15201804.txt', 'utf8');
        const received = fs_1.default.readFileSync('R15201804.txt', 'utf8');
        expect(received).toEqual(expected);
    });
});
