'use client';

import Link from 'next/link';
import useStore from '@/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
import Button from '@mui/material/Button';
import Logo from './logo';
import { Backdrop } from '@mui/material';
type ProfileType = Database['public']['Tables']['profiles']['Row'];

const Navigation = ({
  session,
  profile,
}: {
  session: Session | null;
  profile: ProfileType | null;
}) => {
  const { setUser } = useStore();

  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
      customer_id: session && profile ? profile.customer_id : '',
      team: null,
    });
  }, [session, setUser, profile]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <header className="border-scale-300 border-b backdrop-blur-sm transition-opacity fixed  w-full z-50">
      <div className="p-5 container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          <Logo />
        </Link>

        <div className="text-sm font-bold">
          {session ? (
            <div className="flex items-center space-x-5">
              <Link href="/settings/profile">
                <div className="relative w-10 h-10">
                  <Image
                    src={profile && profile.avatar_url ? profile.avatar_url : '/default.png'}
                    className="rounded-full object-cover"
                    alt="avatar"
                    fill
                  />
                </div>
              </Link>
              <div className="relative w-10 h-10 grid place-items-center rounded cursor-pointer bg-gray-600 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login" className={'block'}>
                <Button
                  variant="contained"
                  disableElevation
                  className="justify-center items-center space-x-4 text-center rounded-md transition-all dark:border-green-700 dark:hover:border-green-900 shadow-sm text-xs px-4 py-2 hidden text-white lg:block bg-primary hover:bg-green-900 hover:brightness-90"
                >
                  ログイン
                </Button>
              </Link>
              <Link href="/auth/signup">新規登録</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
