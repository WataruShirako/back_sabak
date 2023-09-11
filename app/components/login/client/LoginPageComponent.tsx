'use client';

import { LoginButton } from '@/app/components/login/client/button/LoginButton';
import Link from 'next/link';

export default function LoginPageComponent() {
  return (
    <div className="max-w-[400px] mx-auto mt-40">
      <div className="text-center font-bold text-xl mb-10 w-40 md:w-80 m-auto"></div>

      <LoginButton />
      <div className="text-center text-sm mt-5 opacity-60">
        <p>
          <Link href={'/terms'} className={'underline'}>
            利用規約
          </Link>
          と
          <Link href={'/privacy'} className={'underline'}>
            プライバシーポリシー
          </Link>
          に 同意したうえで
          <br />
          ログインしてください。
        </p>
      </div>
    </div>
  );
}
