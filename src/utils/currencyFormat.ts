export const currencyFormat = (value: number) => {
  const toReal = value / 100;
  const configs: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'BRL',
  };
  return Intl.NumberFormat('pt-BR', configs).format(toReal);
};
