import RegistroIPI from '../RegistroIPI';
import ApuracaoIPI from '../apuracaoIPI';
import Participante from '../Participante';
import NotaFiscal from '../NotaFiscal';

/*
 * Defines test db content, may be used to populate the db.
*/

export const registrosIPI: RegistroIPI[] = [{
  paAno: 2018,
  paMes: 4,
  cfop: '5101',
  baseCalc: 100000,
  ipi: 10000
}, {
  paAno: 2018,
  paMes: 4,
  cfop: '1101',
  baseCalc: 147619,
  ipi: 14762,
  outras: 47619
}, {
  paAno: 2018,
  paMes: 4,
  cfop: '1556',
  outras: 110000
}, {
  paAno: 2018,
  paMes: 4,
  cfop: '1551',
  outras: 110000
}];
export const apuracoesIPI: ApuracaoIPI[] = [{
  paAno: 2018,
  paMes: 4,
  creditoNacional: 14762,
  debitoNacional: 10000,
}];
export const participantes: Participante[] = [{
  codigo: 'FOR000000001',
  nome: 'Industrias Baiano Ltda',
  cnpj: '11111111000191'
}, {
  codigo: 'FOR000000002',
  nome: 'Comercial Baiano Ltda',
  cnpj: '22222222000191'
}, {
  codigo: 'FOR000000003',
  nome: 'American Company Inc',
  cnpj: ''
}];
export const notasFiscais: NotaFiscal[] = [{
  emitenteCNPJ: '11111111000191',
  num: 1,
  serie: '1',
  data: '01042018',
  dataES: '01042018',
  cfop: '1101',
  total: 110000,
  ipiDestacado: 10000,
  ipiCredOuDeb: 10000,
  codSituacao: 0,
  paAno: 2018,
  paMes: 4
}, {
  emitenteCNPJ: '11111111000191',
  num: 2,
  serie: '1',
  data: '01042018',
  dataES: '01042018',
  cfop: '1551',
  total: 110000,
  ipiDestacado: 10000,
  ipiCredOuDeb: 0,
  codSituacao: 0,
  paAno: 2018,
  paMes: 4
}, {
  emitenteCNPJ: '11111111000191',
  num: 3,
  serie: '1',
  data: '01042018',
  dataES: '01042018',
  cfop: '1556',
  total: 110000,
  ipiDestacado: 10000,
  ipiCredOuDeb: 0,
  codSituacao: 0,
  paAno: 2018,
  paMes: 4
}, {
  emitenteCNPJ: '22222222000191',
  num: 1,
  serie: '1',
  data: '01042018',
  dataES: '01042018',
  cfop: '1101',
  total: 100000,
  ipiCredOuDeb: 4762,
  codSituacao: 0,
  paAno: 2018,
  paMes: 4
}, {
  emitenteCNPJ: '00000000000191',
  num: 1,
  serie: '1',
  data: '01042018',
  dataES: '01042018',
  cfop: '5101',
  total: 110000,
  ipiDestacado: 10000,
  ipiCredOuDeb: 10000,
  codSituacao: 0,
  paAno: 2018,
  paMes: 4
}];
