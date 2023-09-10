'use client';

import Link from 'next/link';
import userStore from '@/store/userStore';
import { useEffect } from 'react';
import type { Database } from '@/lib/database.types';
import Button from '@mui/material/Button';
import Logo from './logo';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Session, getServerSession } from 'next-auth';
type ProfileType = Database['public']['Tables']['profiles']['Row'];

interface NavigationProps {
  session: Session | null; // ここでsessionの型を定義
  profile: ProfileType | null;
}

const Navigation: React.FC<NavigationProps> = ({ session, profile }) => {
  const { setUser } = userStore();
  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session && profile ? profile.id : '',
      email: session && profile ? profile.email : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
      customer_id: session && profile ? profile.customer_id : '',
      team: null,
    });
  }, [profile, session, setUser]);

  return (
    <header className="border-scale-300 border-b backdrop-blur-sm transition-opacity fixed  w-full z-50 h-12 flex items-center justify-between">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          <Logo />
        </Link>

        <div className="text-sm font-bold">
          {session ? (
            <div className="flex items-center space-x-5">
              <div
                className={'flex items-center gap-1 cursor-pointer'}
                onClick={(e) => e.preventDefault()}
              >
                <div className="relative">
                  <Avatar className={'w-8 h-8'}>
                    <AvatarImage
                      src={session ? session.user?.image! : '/default.png'}
                      className="rounded-full object-cover"
                      alt="avatar"
                    />
                  </Avatar>
                </div>
                <ChevronDown className={'w-5 h-5 text-gray-700'} />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/" className={'block'}>
                <Button
                  variant="contained"
                  disableElevation
                  className="justify-center items-center space-x-4 text-center rounded-md transition-all dark:border-green-700 dark:hover:border-green-900 shadow-sm text-xs px-4 py-2 hidden text-white lg:block bg-primary bg-green-700 hover:bg-green-900 hover:brightness-90"
                >
                  ログイン
                </Button>
              </Link>
              <Link href="/">新規登録</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
