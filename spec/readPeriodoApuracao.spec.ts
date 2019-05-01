import readPeriodoApuracao from "../readPeriodoApuracao";

describe('readPeriodoApuracao', () => {
  it('can read PeriodoApuracao', () => {
      const line = '|E500|0|01042014|30042014|';
      const periodoApuracao = readPeriodoApuracao(line.split('|'));
      expect(periodoApuracao.ano).toBe(2014);
      expect(periodoApuracao.mes).toBe(4);
  });
});
