"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createApuracaoIPIModel_1 = __importDefault(require("../createApuracaoIPIModel"));
const testDB_1 = require("./testDB");
const readAjusteApuracaoIPI_1 = __importDefault(require("../readAjusteApuracaoIPI"));
describe('readRegistro', () => {
    let apuracaoIPIModel;
    let periodoApuracao;
    beforeAll(async () => {
        await mongoose_1.default.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        apuracaoIPIModel = createApuracaoIPIModel_1.default();
        periodoApuracao = { ano: 2018, mes: 4 };
    });
    afterAll(async () => {
        mongoose_1.default.models = {};
        await mongoose_1.default.disconnect();
    });
    beforeEach(async () => {
        await apuracaoIPIModel.deleteMany({});
        await apuracaoIPIModel.create(testDB_1.apuracoesIPI);
    });
    it('can read and update ApuracaoIPI, extorno de débito', async () => {
        const line = '|E530|1|100,00|001|9|||';
        const apuracaoIPIDoc = await readAjusteApuracaoIPI_1.default(apuracaoIPIModel, periodoApuracao, line.split('|'));
        expect(apuracaoIPIDoc.paAno).toBe(2018);
        expect(apuracaoIPIDoc.paMes).toBe(4);
        expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
        expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
        expect(apuracaoIPIDoc.estornoDebito).toBe(10000);
    });
    it('can read and update ApuracaoIPI, crédito presumido', async () => {
        const line = '|E530|1|100,00|010|9|||';
        const apuracaoIPIDoc = await readAjusteApuracaoIPI_1.default(apuracaoIPIModel, periodoApuracao, line.split('|'));
        expect(apuracaoIPIDoc.paAno).toBe(2018);
        expect(apuracaoIPIDoc.paMes).toBe(4);
        expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
        expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
        expect(apuracaoIPIDoc.creditoPresumido).toBe(10000);
    });
    it('can read and update ApuracaoIPI, crédito presumido', async () => {
        const line = '|E530|1|100,00|010|9|||';
        const apuracaoIPIDoc = await readAjusteApuracaoIPI_1.default(apuracaoIPIModel, periodoApuracao, line.split('|'));
        expect(apuracaoIPIDoc.paAno).toBe(2018);
        expect(apuracaoIPIDoc.paMes).toBe(4);
        expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
        expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
        expect(apuracaoIPIDoc.creditoPresumido).toBe(10000);
    });
    it('can read and update ApuracaoIPI, crédito outro', async () => {
        const line = '|E530|1|100,00|002|9|||';
        const apuracaoIPIDoc = await readAjusteApuracaoIPI_1.default(apuracaoIPIModel, periodoApuracao, line.split('|'));
        expect(apuracaoIPIDoc.paAno).toBe(2018);
        expect(apuracaoIPIDoc.paMes).toBe(4);
        expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
        expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
        expect(apuracaoIPIDoc.creditoOutro).toBe(10000);
    });
    it('can read and update ApuracaoIPI, estorno crédito', async () => {
        const line = '|E530|1|100,00|101|9|||';
        const apuracaoIPIDoc = await readAjusteApuracaoIPI_1.default(apuracaoIPIModel, periodoApuracao, line.split('|'));
        expect(apuracaoIPIDoc.paAno).toBe(2018);
        expect(apuracaoIPIDoc.paMes).toBe(4);
        expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
        expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
        expect(apuracaoIPIDoc.estornoCredito).toBe(10000);
    });
    it('can read and update ApuracaoIPI, ressarcimento', async () => {
        const line = '|E530|1|100,00|103|9|||';
        const apuracaoIPIDoc = await readAjusteApuracaoIPI_1.default(apuracaoIPIModel, periodoApuracao, line.split('|'));
        expect(apuracaoIPIDoc.paAno).toBe(2018);
        expect(apuracaoIPIDoc.paMes).toBe(4);
        expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
        expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
        expect(apuracaoIPIDoc.ressarcimento).toBe(10000);
    });
    it('can read and update ApuracaoIPI, debito Outro', async () => {
        const line = '|E530|1|100,00|102|9|||';
        const apuracaoIPIDoc = await readAjusteApuracaoIPI_1.default(apuracaoIPIModel, periodoApuracao, line.split('|'));
        expect(apuracaoIPIDoc.paAno).toBe(2018);
        expect(apuracaoIPIDoc.paMes).toBe(4);
        expect(apuracaoIPIDoc.creditoNacional).toBe(14762);
        expect(apuracaoIPIDoc.debitoNacional).toBe(10000);
        expect(apuracaoIPIDoc.debitoOutro).toBe(10000);
    });
});
