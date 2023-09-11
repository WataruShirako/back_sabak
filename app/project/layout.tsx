import { Session, getServerSession } from 'next-auth';
import HeaderSecond from '../components/header/header-second';
import HeaderThird from '../components/header/header-third';
import userStore from '@/store/userStore';
import { useEffect } from 'react';
import { ProfileType } from '../types/user_database';
import { useSession } from 'next-auth/react';
import { authOptions } from '@/lib/authOptions';

export default async function ProjectLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  console.log('session', session);

  let title = 'プロジェクト';
  return (
    <>
      <HeaderSecond title={session?.user?.name} />
      <HeaderThird />
      {children}
    </>
  );
}
