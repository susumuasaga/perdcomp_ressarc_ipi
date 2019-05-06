"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const createRegistroIPIModel_1 = __importDefault(require("../createRegistroIPIModel"));
const testDB_1 = require("./testDB");
const writeR11_1 = __importDefault(require("../writeR11"));
describe('writeR11', () => {
    let registroIPIModel;
    beforeAll(async () => {
        await mongoose_1.default.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        registroIPIModel = createRegistroIPIModel_1.default();
    });
    afterAll(async () => {
        mongoose_1.default.models = {};
        await mongoose_1.default.disconnect();
    });
    beforeEach(async () => {
        await registroIPIModel.deleteMany({});
        await registroIPIModel.create(testDB_1.registrosIPI);
    });
    it('can write file', async () => {
        const entidade = { cnpj: '00000000000191', nome: '',
            paAno: 2018, paMes: 4 };
        await writeR11_1.default(registroIPIModel, entidade);
        const expected = fs_1.default.readFileSync('spec/R11201804.txt', 'utf8');
        const received = fs_1.default.readFileSync('R11201804.txt', 'utf8');
        expect(received).toEqual(expected);
    });
});
