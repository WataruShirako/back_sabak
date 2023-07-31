import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';
import Landing from '@/app/components/Landing';
import TaskItem from '@/app/components/task/task-item';

// メインページ
const TaskCompleted = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 投稿を取得
  const { data: taskData } = await supabase.from('todos').select('*').eq('is_complete', true);

  // 投稿がない場合
  if (!taskData || taskData.length === 0) {
    return <div className="text-center">タスクはありません</div>;
  }

  return (
    <>
      <div className="max-w-screen-lg m-auto flex mt-5 gap-2 flex-wrap">
        {!session ? (
          <Landing />
        ) : (
          taskData.map((task, index) => {
            return <TaskItem key={index} task={task} />;
          })
        )}
      </div>
    </>
  );
};

export default TaskCompleted;
