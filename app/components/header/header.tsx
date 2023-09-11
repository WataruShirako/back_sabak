import Link from 'next/link';
import userStore from '@/store/userStore';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Logo from './logo';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Session } from 'next-auth';
import { LogoutButton } from '../button';
import { ProfileType } from '@/app/types/user_database';
import { clientSignInWithOAuthGoogle } from '@/app/utils/supabase/controller/supabaseClient';
import { getSupabaseSession, getUser } from '@/app/utils/supabase/controller/supabaseServer';
import { LoginButton } from '../login/client/button/LoginButton';

interface NavigationProps {
  session: Session | null; // ここでsessionの型を定義
  profile: ProfileType | null;
}

const Navigation: React.FC = async () => {
  // const { setUser } = userStore();
  const session = await getSupabaseSession();

  console.log(session?.user.user_metadata);
  // 状態管理にユーザー情報を保存
  // useEffect(() => {
  //   setUser({
  //     id: session ? session.user_metadata : '',
  //     email: session && profile ? profile.email : '',
  //     name: session && profile ? profile.name : '',
  //     introduce: session && profile ? profile.introduce : '',
  //     avatar_url: session && profile ? profile.avatar_url : '',
  //     customer_id: session && profile ? profile.customer_id : '',
  //     team: null,
  //   });
  // }, [profile, session, setUser]);

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
                      src={session ? session.user.user_metadata.avatar_url : '/default.png'}
                      className="rounded-full object-cover"
                      alt="avatar"
                    />
                  </Avatar>
                </div>
                <ChevronDown className={'w-5 h-5 text-gray-700'} />
              </div>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
