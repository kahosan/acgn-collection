import LoginForm from './form';

import { getServerSession } from 'next-auth';
import { permanentRedirect } from 'next/navigation';

import { options } from '~/lib/auth';

export const metadata = {
  title: '登入至 ACGN Collection'
};

export default async function Login() {
  const session = await getServerSession(options);
  if (session?.token)
    permanentRedirect('/'); // prevent refreshing twice

  return (
    <main className="mt-40 max-w-lg mx-auto">
      <h1 className="mb-8 text-center text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-red-300">
        ACGN Collection
      </h1>
      <LoginForm />
    </main>
  );
}
