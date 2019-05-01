"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const createRegistroIPIModel_1 = require("../createRegistroIPIModel");
const testDB_1 = require("./testDB");
describe('RegistroIPI', function () {
    let registroIPItModel;
    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        registroIPItModel = createRegistroIPIModel_1.createRegistroIPIModel();
    });
    afterAll(function () {
        mongoose.models = {};
        mongoose.disconnect();
    });
    it('can create RegistroIPIModel', async () => {
        await registroIPItModel.deleteMany({});
        await registroIPItModel.create(testDB_1.registrosIPI);
        const registroIPIDocs = await registroIPItModel.find().exec();
        expect(registroIPIDocs.length).toBe(4);
    });
});
