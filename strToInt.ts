export default function strToInt(str: string): number {
    /**
     * Returns the integer number corresponding to a string.
     * 
     * @param str - A string with format #,00
     * @returns The number times 100
     */
    return Math.round(Number(str.replace(',', '.'))*100);
}
