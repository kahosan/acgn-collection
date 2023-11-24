'use client';

import { Button } from '@nextui-org/react';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();

  const login = () => {
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    signIn('bangumi', {
      redirect: false,
      callbackUrl
    });
  };

  return (
    <Button
      onPress={login}
      color="danger"
      size="lg"
      className="w-[100%] mt-4 font-medium"
    >
      登入
    </Button>
  );
}
