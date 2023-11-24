import NextAuth from 'next-auth/next';
import { options } from '~/lib/auth';

const handler = NextAuth(options);

export const GET = handler;
export const POST = handler;
