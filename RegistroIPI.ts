interface RegistroIPI {
  _id?: string;
  paAno: number;
  paMes: number;
  cfop: string;
  baseCalc?: number;
  ipi?: number;
  isentasNaoTrib?: number;
  outras?: number
}

export default RegistroIPI;
