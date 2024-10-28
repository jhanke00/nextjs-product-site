import { ReadonlyURLSearchParams } from 'next/navigation';

export function createQueryString(searchParams: ReadonlyURLSearchParams, name: string, value?: string) {
  const params = new URLSearchParams(searchParams.toString());
  const current = params.get(name);
  if (!value || (current && value === current)) {
    params.delete(name);
  } else {
    params.set(name, value);
  }

  return params.toString();
}
