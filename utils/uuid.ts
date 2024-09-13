export const generateShortId = () => {
  return Math.random().toString(36).substr(2, 8); // Generate a shorter unique ID
};
