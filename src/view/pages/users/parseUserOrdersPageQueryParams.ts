import { ParsedUrlQuery } from 'querystring';
import { parseIntFromQueryParam } from '../../../utils/parseNumberFromQueryParam';

export const parseUserOrdersPageQueryParams = (query: ParsedUrlQuery) => {
  const { page, perPage } = query;

  const parsedPage = parseIntFromQueryParam(page) ?? 1;
  const parsedPerPage = parseIntFromQueryParam(perPage) ?? 10;

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
