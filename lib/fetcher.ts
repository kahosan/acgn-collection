import { toast } from 'sonner';

import { BASE_URL } from './constant';

import type { ErrorResponse } from '~/types/bangumi/common';

export class HTTPError extends Error {
  data: ErrorResponse;
  status: number;
  constructor(message: string, data: ErrorResponse, status: number) {
    super(message);
    this.name = 'HTTPError';
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
    error.message = '请求 API 错误，请稍后再试';
    toast.error(message ?? error.message);
    console.error(error);
  }
};

export type RequestInitWithBase = RequestInit & { base?: string | URL };

export async function fetcher<T>(key: string | [string, string | RequestInitWithBase], { arg }: { arg?: Record<string, any> } = {}) {
  const headers = new Headers();

  const [_url] = typeof key === 'string' ? [key] : key;

  let token: string | undefined;
  const options: RequestInitWithBase = {};

  const v = Array.isArray(key) ? key.at(1) : undefined;
  if (typeof v === 'string')
    token = v;
  else if (v && typeof v !== 'string')
    Object.assign(options, v);

  if (token)
    headers.set('Authorization', `Bearer ${token}`);

  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers))
      headers.set(key, value);
  }

  if (arg) {
    options.method = options.method ?? 'POST';
    options.body = JSON.stringify(arg);
    headers.set('Content-Type', 'application/json');
  }

  let url: string | URL = new URL(_url, BASE_URL);

  if (options.base && options.base !== '/')
    url = new URL(_url, options.base);
  else if (options.base === '/')
    url = _url;

  const res = await fetch(url, {
    ...options,
    headers
  });

  const data = res.headers.get('Content-Type')?.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    if (typeof data === 'string')
      throw new Error(data);
    else if ('title' in data)
      throw new HTTPError(data.title, data, res.status);

    throw new Error('Failed for fetcher');
  }

  return data as T;
}
