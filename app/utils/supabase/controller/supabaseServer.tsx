import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabaseSeverComponent = createServerComponentClient<Database>({
  cookies,
});

export const supabaseSignIn = () => {
  return supabaseSeverComponent.auth.signInWithOAuth({
    provider: 'google',
  });
};

export const supabaseSignOut = () => {
  return supabaseSeverComponent.auth.signOut();
};

export const getSupabaseSession = async () => {
  const {
    data: { session },
  } = await supabaseSeverComponent.auth.getSession();
  return session;
};

export const getUser = async () => {
  const {
    data: { user },
  } = await supabaseSeverComponent.auth.getUser();
  return user;
};

export const getCurrentUserId = async () => {
  const session = await getSupabaseSession();
  return session?.user?.id;
};
