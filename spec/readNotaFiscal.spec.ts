import mongoose from 'mongoose';
import readNotaFiscal from '../readNotaFiscal';
import { participantes } from './testDB';
import { ParticipanteModel, createParticipanteModel } from '../createParticipanteModel';
import Entidade from '../Entidade';

describe('readNotaFiscal', () => {
  let participanteModel: ParticipanteModel;
  let entidade: Entidade;

  beforeAll(async () => {
    entidade = { cnpj: '00000000000191', nome: 'Esta Empresa Ltda',
                 paAno: 2014, paMes: 4 };
    mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    participanteModel = createParticipanteModel();
    await participanteModel.deleteMany({});
    await participanteModel.create(participantes);
  });

  afterAll(function () {
    mongoose.models = {};
    mongoose.disconnect();
  });

  it('can read and create NotaFiscal emissão própria', async () => {
    const line = '|C100|0|0|FOR000000003|55|00|1|9028|35140402352777000140550010000090281000026372|04042014|04042014|12860,41|1|0,00|0,00|9071,05|1|0,00|0,00|244,00|12860,41|2314,88|0,00|0,00|453,56|0,00|0,00|0,00|0,00|';
    const notaFiscal = await readNotaFiscal(entidade, participanteModel,
                                            line.split('|'));
    expect(notaFiscal.emitenteCNPJ).toBe('00000000000191');
    expect(notaFiscal.num).toBe(9028);
    expect(notaFiscal.serie).toBe('1');
    expect(notaFiscal.data).toBe('04042014');
    expect(notaFiscal.dataES).toBe('04042014');
    expect(notaFiscal.codSituacao).toBe(0);
    expect(notaFiscal.paAno).toBe(2014);
    expect(notaFiscal.paMes).toBe(4);
  });

  it('can read and create NotaFiscal terceiros', async () => {
    const line = '|C100|0|1|FOR000000001|55|00|1|45255|35140453369435000174550010000452551311474887|03042014|04042014|922,61|1|0,00|0,00|903,52|0|0,00|0,00|0,00|922,61|166,07|0,00|0,00|19,09|0,00|0,00|0,00|0,00|';
    const notaFiscal = await readNotaFiscal(entidade, participanteModel,
                                             
                                            line.split('|'));
    expect(notaFiscal.emitenteCNPJ).toBe('11111111000191');
    expect(notaFiscal.num).toBe(45255);
    expect(notaFiscal.serie).toBe('1');
    expect(notaFiscal.data).toBe('03042014');
    expect(notaFiscal.dataES).toBe('04042014');
    expect(notaFiscal.codSituacao).toBe(0);
    expect(notaFiscal.paAno).toBe(2014);
    expect(notaFiscal.paMes).toBe(4);
  }); 
});
