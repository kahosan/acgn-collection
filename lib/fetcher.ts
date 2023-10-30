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

export const fetcherWithAuth = async <T>([url, token]: [string, string], options?: RequestInit): Promise<T> => {
  const headers = new Headers({
    Authorization: `Bearer ${token}`
  });

  if (options?.headers) {
    for (const [key, value] of Object.entries(options.headers))
      headers.set(key, value);
  }

  const res = await fetch(new URL(url, BASE_URL), {
    headers,
    ...options
  });

  if (!res.ok) {
    const data = await res.json();
    if ('title' in data)
      throw new HTTPError(data.title, data, res.status);

    throw new Error('Failed for fetcherWithAuth');
  }

  return res.json() as Promise<T>;
};

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const headers = new Headers();

  if (options?.headers) {
    for (const [key, value] of Object.entries(options.headers))
      headers.set(key, value);
  }

  const res = await fetch(new URL(url, BASE_URL), {
    headers,
    ...options
  });

  if (!res.ok) {
    const data = await res.json();
    if ('title' in data)
      throw new HTTPError(data.title, data, res.status);

    throw new Error('Failed for fetcher');
  }

  return res.json() as Promise<T>;
};

export const fetcherWithOptions = async <T>([url, options]: [string, RequestInit]): Promise<T> => {
  const headers = new Headers();

  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers))
      headers.set(key, value);
  }

  const res = await fetch(new URL(url, BASE_URL), {
    headers,
    ...options
  });

  if (!res.ok) {
    const data = await res.json();
    if ('title' in data)
      throw new HTTPError(data.title, data, res.status);

    throw new Error('Failed for fetcher');
  }

  return res.json() as Promise<T>;
};
