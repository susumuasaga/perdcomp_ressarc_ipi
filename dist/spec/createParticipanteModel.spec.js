"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const createParticipanteModel_1 = require("../createParticipanteModel");
const testDB_1 = require("./testDB");
describe('Participante', function () {
    let participanteModel;
    beforeAll(async () => {
        mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        participanteModel = createParticipanteModel_1.createParticipanteModel();
        await participanteModel.deleteMany({});
        await participanteModel.create(testDB_1.participantes);
    });
    afterAll(function () {
        mongoose.models = {};
        mongoose.disconnect();
    });
    it('can create ParticipanteModel', async () => {
        const participanteDocs = await participanteModel.find().exec();
        expect(participanteDocs.length).toBe(3);
    });
});
