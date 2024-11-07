export const parseIntFromQueryParam = (param: string | Array<string> | undefined) => {
  if (param === undefined) {
    return undefined;
  }

  if (Array.isArray(param)) {
    return undefined;
  }

  const parsed = parseInt(param);
  if (isNaN(parsed)) {
    return undefined;
  }

  return parsed;
};
