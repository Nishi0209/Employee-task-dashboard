export const sanitizeInput = (value) => {
  return value
    .trim()
    .replace(/[<>]/g, "");
};
