import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { use } from 'react';

export const supabaseCookie = createServerComponentClient<Database>({
  cookies,
});
export const getSupabaseAuth = () => {
  return supabaseCookie.auth;
};
export const getSupabaseSession = () => {
  const {
    data: { session },
  } = use(getSupabaseAuth().getSession());
  return session;
};

export const getCurrentUserId = async () => {
  const { data: { session } } = await supabaseCookie.auth.getSession();
  return session?.user?.id;
};