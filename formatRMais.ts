import numeral from 'numeral';

export default function formatRMais(n: number): string {
    return numeral(n).format('00000000000000');
}

export function formatMM(n: number): string {
    return numeral(n).format('00');
}

export function formatAAAA(n: number): string {
    return numeral(n).format('0000');
}

export function formatXN(n: number): string {
    return numeral(n).format('000000000')
}
