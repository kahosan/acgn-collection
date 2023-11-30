'use client';

import { Button } from '@nextui-org/react';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error)
    toast.error(`登入错误: ${error}`, { id: 'login-error' });

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
      从 Bangumi 登入
    </Button>
  );
}
