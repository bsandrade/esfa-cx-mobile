export function formatCurrency(input: Number): string {
  return input.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
}
