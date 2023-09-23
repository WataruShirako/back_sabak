'use client';

import Link from 'next/link';
import Logo from '../logo';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { LogoutButton } from '../../button';
import { ProfileType } from '@/app/types/user_database';
import { LoginButton } from '../../login/client/button/LoginButton';
import type { Session } from '@supabase/auth-helpers-nextjs';
import userStore from '@/store/userStore';
import { useEffect } from 'react';
import { AuthButton } from '@/app/buttons/AuthButton';

const Header = ({ session, profile }: { session: Session | null; profile: ProfileType | null }) => {
  const { setUser } = userStore();

  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
    });
  }, [session, setUser, profile]);

  return (
    <header className="border-scale-300 border-b backdrop-blur-sm transition-opacity fixed  w-full z-50 h-12 flex items-center justify-between">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          <Logo />
        </Link>

        <div className="text-sm font-bold">
          {session ? (
            <div className="flex items-center space-x-5">
              <div className={'flex items-center gap-1 cursor-pointer'}>
                <div className="relative">
                  <Avatar className={'w-8 h-8'}>
                    <AvatarImage
                      src={session ? session?.user.user_metadata.avatar_url : '/default.png'}
                      className="rounded-full object-cover"
                      alt="avatar"
                    />
                  </Avatar>
                </div>
                <ChevronDown className={'w-5 h-5 text-gray-700'} />
              </div>
              <AuthButton session={session} />
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <AuthButton session={session} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
