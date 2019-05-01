interface NotaFiscal {
    _id?: string;
    emitenteCNPJ: string;
    num: string;
    serie: string;
    cfop?: string;
    data: string;
    dataES: string;
    total?: number;
    ipiDestacado?: number;
    ipiCredOuDeb?: number;
    codSituacao: number;
    paAno: number;
    paMes: number;
  }
  
  export default NotaFiscal;
  