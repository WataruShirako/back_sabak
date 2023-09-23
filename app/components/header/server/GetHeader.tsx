import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Header from '../client/header';
import { SupabaseListener } from '@/app/utils/supabase/controller/supabaseServer';

const GetHeader = async () => {
  const supabase = SupabaseListener();
  const session = (await supabase).session;
  const profile = (await supabase).profile;

  return <Header session={session} profile={profile} />;
};

export default GetHeader;
