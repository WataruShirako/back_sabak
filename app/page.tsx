import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import Top from '@/components/Top';
import Promote from '@/components/promote';

// メインページ
const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <div className="text-center text-xl">{session ? <Top /> : <Promote />}</div>;
};

export default Home;
