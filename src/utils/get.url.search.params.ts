/**
 * Constructs a URLSearchParams object based on the given query data and returns it.
 *
 * @param {Record<string, any>} queryData - The query data used to construct the URLSearchParams object.
 * @returns {URLSearchParams} - The constructed URLSearchParams object.
 */
export const getUrlSearchParams = (queryData: Record<string, any>): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(queryData)) {
    if (Array.isArray(value)) {
      params.append(key, `${value[0]},${value[1]}`);
    } else {
      params.append(key, value.toString());
    }
  }

  return params;
};
