import readEntidade from "../readEntidade";

describe('readEntidade', () => {
  it('can read Entidade', () => {
      const line = '|0000|012|0|01122018|31122018|BATURRO S CONFECÇÕES E IMPRESSOS LTDA|02352777000140||SP|472010089113|3532405|1723||A|0|';
      const entidade = readEntidade(line.split('|'));
      expect(entidade.cnpj).toBe('02352777000140');
      expect(entidade.nome).toBe('BATURRO S CONFECÇÕES E IMPRESSOS LTDA');
      expect(entidade.paAno).toBe(2018);
      expect(entidade.paMes).toBe(12);
  });
});
