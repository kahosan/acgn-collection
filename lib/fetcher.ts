import { toast } from 'sonner';

import { BASE_URL } from './constant';

import type { ErrorResponse } from '~/types/bangumi/common';

export class HTTPError extends Error {
  data: ErrorResponse;
  status: number;
  constructor(message: string, data: ErrorResponse, status: number) {
    super(message);
    this.data = data;
    this.status = status;
  }
}

export const fetcherErrorHandler = (error: Error, message?: string) => {
  if (error instanceof HTTPError) {
    const text = message ? `${message}: ${error.data.description}` : error.data.description;
    toast.error(text);
    console.error(error);
  } else {
    toast.error(message ?? error.message);
    console.error(error);
  }
};

export async function fetcher<T>(key: string | [string, string | RequestInit], { arg }: { arg?: Record<string, any> } = {}, options?: RequestInit) {
  const headers = new Headers();

  const [url] = typeof key === 'string' ? [key] : key;

  let token: string | undefined;
  let keyOptions: RequestInit | undefined;

  const v = Array.isArray(key) ? key.at(1) : undefined;
  if (typeof v === 'string')
    token = v;
  else if (v && typeof v !== 'string')
    keyOptions = v;

  if (token)
    headers.set('Authorization', `Bearer ${token}`);

  if (keyOptions?.headers) {
    for (const [key, value] of Object.entries(keyOptions.headers))
      headers.set(key, value);
  } else if (options?.headers) {
    for (const [key, value] of Object.entries(options.headers))
      headers.set(key, value);
  }

  const init = {
    ...options,
    ...keyOptions
  };

  if (arg) {
    init.method = 'POST';
    init.body = JSON.stringify(arg);
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(new URL(url, BASE_URL), {
    headers,
    ...init
  });

  const data = res.headers.get('Content-Type')?.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    if ('title' in data)
      throw new HTTPError(data.title, data, res.status);

    throw new Error('Failed for fetcher');
  }

  return data as T;
}
