import mongoose = require('mongoose');

export interface ParticipanteDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    codigo: string;
    cnpj: string;
    nome: string;
  }

export type ParticipanteModel = mongoose.Model<ParticipanteDoc>;

export default function createParticipanteModel(): ParticipanteModel {
  const participanteSchema = new mongoose.Schema({
    codigo: { type: String, unique: true },
    cnpj: { type: String, index: true },
    nome: { type: String, required: true },
  });
  return mongoose.model<ParticipanteDoc>('Participante', participanteSchema);
}
