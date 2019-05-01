interface ApuracaoIPI {
    _id?: string;
    paAno: number;
    paMes: number;
    creditoNacional?: number;
    creditoImportacao?: number;
    estornoDebito?: number;
    creditoPresumido?: number;
    creditoExtemporaneo?: number;
    creditoOutro?: number;
    debitoNacional?: number;
    estornoCredito?: number;
    ressarcimento?: number;
    debitoOutro?: number
  }
  
  export default ApuracaoIPI;
  