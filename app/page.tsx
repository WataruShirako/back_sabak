import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';
import Landing from '@/app/components/Landing';
import TaskItem from '@/app/components/task/task-item';
import Link from 'next/link';

// メインページ
const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 未ログインはLPに遷移
  if (!session) {
    return <Landing />;
  }

  // 投稿を取得
  const { data: taskData } = await supabase
    .from('todos')
    .select('*')
    .eq('is_complete', false)
    .eq('user_id', session?.user.id);

  return (
    <>
      <div className="max-w-screen-lg m-auto flex mt-5 gap-2 flex-wrap">
        {!taskData || taskData.length === 0 ? (
          <div className="text-center">タスクはありません</div>
        ) : (
          taskData.map((task, index) => {
            return <TaskItem key={index} task={task} />;
          })
        )}
      </div>
      <Link
        href="/tasks/new"
        className="mt-5 max-w-screen-lg rounded-md m-auto flex !border-primary border hover:bg-green-900 hover:bg-opacity-5 w-full h-20 items-center justify-center cursor-pointer"
      >
        <span className="text-primary text-sm">＋タスクを新規作成</span>
      </Link>
    </>
  );
};

export default Home;
