"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createRegistroIPIModel_1 = __importDefault(require("../createRegistroIPIModel"));
const testDB_1 = require("./testDB");
const readRegistroIPI_1 = __importDefault(require("../readRegistroIPI"));
describe('readRegistro', () => {
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
    it('can read and update registroIPI, CFop = 1101, CST_IPI = 05', async () => {
        const periodoApuracao = { ano: 2018, mes: 4 };
        const line = '|E510|1101|05|9410,98|0,00|0,00|';
        const registroIPIDoc = await readRegistroIPI_1.default(registroIPIModel, periodoApuracao, line.split('|'));
        expect(registroIPIDoc.paAno).toBe(2018);
        expect(registroIPIDoc.paMes).toBe(4);
        expect(registroIPIDoc.cfop).toBe('1101');
        expect(registroIPIDoc.baseCalc).toBe(147619);
        expect(registroIPIDoc.ipi).toBe(14762);
        expect(registroIPIDoc.isentasNaoTrib).toBe(0);
        expect(registroIPIDoc.outras).toBe(988717);
    });
    it('can read and update registroIPI: CFop = 1101, CST_IPI =00', async () => {
        const periodoApuracao = { ano: 2018, mes: 4 };
        const line = '|E510|1101|00|13816,08|9382,83|1052,75|';
        const registroIPIDoc = await readRegistroIPI_1.default(registroIPIModel, periodoApuracao, line.split('|'));
        expect(registroIPIDoc.paAno).toBe(2018);
        expect(registroIPIDoc.paMes).toBe(4);
        expect(registroIPIDoc.cfop).toBe('1101');
        expect(registroIPIDoc.baseCalc).toBe(1085902);
        expect(registroIPIDoc.ipi).toBe(120037);
        expect(registroIPIDoc.isentasNaoTrib).toBe(0);
        expect(registroIPIDoc.outras).toBe(385669);
    });
    it('can read and update registroIPI: CFop = 1101, CST_IPI =02', async () => {
        const periodoApuracao = { ano: 2018, mes: 4 };
        const line = '|E510|1101|02|3329,50|0,00|0,00|';
        const registroIPIDoc = await readRegistroIPI_1.default(registroIPIModel, periodoApuracao, line.split('|'));
        expect(registroIPIDoc.paAno).toBe(2018);
        expect(registroIPIDoc.paMes).toBe(4);
        expect(registroIPIDoc.cfop).toBe('1101');
        expect(registroIPIDoc.baseCalc).toBe(147619);
        expect(registroIPIDoc.ipi).toBe(14762);
        expect(registroIPIDoc.isentasNaoTrib).toBe(332950);
        expect(registroIPIDoc.outras).toBe(47619);
    });
    it('can read and create registroIPI: CFop = 1124, CST_IPI =49', async () => {
        const periodoApuracao = { ano: 2018, mes: 4 };
        const line = '|E510|1124|49|506,88|0,00|0,00|';
        const registroIPIDoc = await readRegistroIPI_1.default(registroIPIModel, periodoApuracao, line.split('|'));
        expect(registroIPIDoc.paAno).toBe(2018);
        expect(registroIPIDoc.paMes).toBe(4);
        expect(registroIPIDoc.cfop).toBe('1124');
        expect(registroIPIDoc.baseCalc).toBe(0);
        expect(registroIPIDoc.ipi).toBe(0);
        expect(registroIPIDoc.isentasNaoTrib).toBe(0);
        expect(registroIPIDoc.outras).toBe(50688);
    });
    it('can read and update registroIPI: CFop = 5101, CST_IPI =52', async () => {
        const periodoApuracao = { ano: 2018, mes: 4 };
        const line = '|E510|5101|52|506,88|0,00|0,00|';
        const registroIPIDoc = await readRegistroIPI_1.default(registroIPIModel, periodoApuracao, line.split('|'));
        expect(registroIPIDoc.paAno).toBe(2018);
        expect(registroIPIDoc.paMes).toBe(4);
        expect(registroIPIDoc.cfop).toBe('5101');
        expect(registroIPIDoc.baseCalc).toBe(100000);
        expect(registroIPIDoc.ipi).toBe(10000);
        expect(registroIPIDoc.isentasNaoTrib).toBe(50688);
        expect(registroIPIDoc.outras).toBe(0);
    });
});
