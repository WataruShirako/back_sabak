'use client';

import Link from 'next/link';
import useStore from '@/store';
import Image from 'next/image';
import { useEffect } from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
import Button from '@mui/material/Button';
import Logo from './logo';
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
      inserted_at: null,
      is_complete: null,
      priority: null,
      task: null,
    });
  }, [session, setUser, profile]);

  return (
    <header className="border-scale-300 border-b backdrop-blur-sm transition-opacity false">
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
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login" className={'block'}>
                <Button
                  variant="contained"
                  className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border dark:border-brand-fixed-1000 dark:hover:border-brand-fixed-1000  shadow-sm text-xs px-2.5 py-1 hidden text-white lg:block bg-green-900"
                >
                  ログイン
                </Button>
              </Link>
              <Link href="/auth/signup">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
