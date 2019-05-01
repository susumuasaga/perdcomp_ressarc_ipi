"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function createParticipanteModel() {
    const participanteSchema = new mongoose.Schema({
        codigo: { type: String, unique: true },
        cnpj: { type: String, index: true },
        nome: { type: String, required: true },
    });
    return mongoose.model('Participante', participanteSchema);
}
exports.createParticipanteModel = createParticipanteModel;
