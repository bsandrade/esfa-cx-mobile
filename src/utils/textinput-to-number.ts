export const textInputToNumber = (input: string) => {
  const newValue = input.replace(/[^\d]/g, '');
  return Number(newValue);
};
