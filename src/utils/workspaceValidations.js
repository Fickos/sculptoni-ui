export const sanitizeIdentificator = (input) => {
  return input.replace(/[^a-zA-Z0-9]/g, '').slice(0, 50);
};
