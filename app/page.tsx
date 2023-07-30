import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import PostItem from '@/app/components/post/post-item';
import type { Database } from '@/lib/database.types';
import type { SubscriptionType } from '@/app/components/types';
import Link from 'next/link';
import { ComputerDesktopIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Landing from '@/app/components/Landing';
import TaskItem from '@/app/components/task/task-item';
import TaskNew from '@/app/components/task/task-new';

// メインページ
const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 投稿を取得
  const { data: taskData } = await supabase.from('todos').select('*');

  // 投稿がない場合
  if (!taskData || taskData.length === 0) {
    return <div className="text-center">投稿はありません</div>;
  }

  return (
    <>
      <div className="col-1 max-w-screen-lg m-auto">
        {!session ? (
          <Landing />
        ) : (
          taskData.map((task, index) => {
            return (
              <>
                <TaskItem key={index} task={task} />
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
