import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Database } from '@/lib/database.types';
import TaskNew from '@/app/components/task/task-new';

// 新規投稿ページ
const PostNewPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login');
  }

  return <TaskNew />;
};

export default PostNewPage;
