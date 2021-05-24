export const formatBrazilianDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('pt-br');
}

export const extractDateFromDateTime = (date: Date) => {
    return new Date(date).toISOString().substring(0,10);
}