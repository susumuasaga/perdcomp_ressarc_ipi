"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const createNotaFiscalModel_1 = __importDefault(require("../createNotaFiscalModel"));
const testDB_1 = require("./testDB");
describe('NotaFiscal', function () {
    let NotaFiscaltModel;
    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        NotaFiscaltModel = createNotaFiscalModel_1.default();
    });
    afterAll(function () {
        mongoose.models = {};
        mongoose.disconnect();
    });
    it('can create NotaFiscalModel', async () => {
        await NotaFiscaltModel.deleteMany({});
        await NotaFiscaltModel.create(testDB_1.notasFiscais);
        const NotaFiscalDocs = await NotaFiscaltModel.find().exec();
        expect(NotaFiscalDocs.length).toBe(6);
    });
});
