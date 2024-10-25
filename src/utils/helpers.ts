export const nonNullishValues = <T extends Record<string, any>>(obj: T) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => !!value));
};
