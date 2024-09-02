type QueryParams = Record<string, string>;

export const removeEmptyProperties = (obj: QueryParams): QueryParams => {
  return Object.entries(obj)
    .filter(([_, value]) => {
      // Define what constitutes an "empty" value
      return value !== undefined && value !== null && value !== '' && value.length !== 0;
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as QueryParams);
};
