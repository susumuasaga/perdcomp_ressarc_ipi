"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const createApuracaoIPIModel_1 = require("../createApuracaoIPIModel");
const testDB_1 = require("./testDB");
describe('ApuracaoIPI', function () {
    let ApuracaoIPItModel;
    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        ApuracaoIPItModel = createApuracaoIPIModel_1.createApuracaoIPIModel();
    });
    afterAll(function () {
        mongoose.models = {};
        mongoose.disconnect();
    });
    it('can create ApuracaoIPIModel', async () => {
        await ApuracaoIPItModel.deleteMany({});
        await ApuracaoIPItModel.create(testDB_1.apuracoesIPI);
        const ApuracaoIPIDocs = await ApuracaoIPItModel.find().exec();
        expect(ApuracaoIPIDocs.length).toBe(1);
    });
});
