import { cookies } from 'next/headers';

import { HTTPError, fetcher } from '~/lib/fetcher';
import type { UserInfo } from '~/types/bangumi/user';

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.replace(/^Bearer /, '') ?? '';

  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': req.headers.get('User-Agent') ?? ''
    }
  };

  try {
    const data = await fetcher<UserInfo>(['/v0/me', options]);
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict;`
      }
    });
  } catch (e) {
    if (e instanceof HTTPError)
      return new Response(JSON.stringify(e.data), { status: e.status, headers: { 'Content-Type': 'application/json' } });

    return new Response((e as Error).message, { status: 500 });
  }
}

export function DELETE() {
  cookies().delete('token');
  return new Response(null, { status: 204 });
}
