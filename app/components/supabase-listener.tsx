import { getServerSession } from 'next-auth';
import Navigation from './header/header';

import { authOptions } from '@/lib/authOptions';
import { signIn } from 'next-auth/react';
import { supabase } from '../utils/client/supabase-client';

const SupabaseListener = async () => {
  // セッションの取得
  const session = await getServerSession(authOptions);

  supabase.auth.signInWithOAuth({ provider: 'google' });

  let profile = null;

  return <Navigation session={session} profile={profile} />;
};

export default SupabaseListener;
