import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { SubscriptionType } from '@/app/components/types';
import PostDetail from '@/app/components/post/post-detail';
import TaskDetail from '@/app/components/task/task-detail';
import type { Database } from '@/lib/database.types';

type PageProps = {
  params: {
    taskId: string;
  };
};

// タスク詳細ページ
const TaskDetailPage = async ({ params }: PageProps) => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 投稿を取得
  const { data: taskData } = await supabase
    .from('todos')
    .select('*')
    .eq('id', params.taskId)
    .single();

  // 投稿がない場合
  if (!taskData) {
    return <div className="text-center">投稿はありません</div>;
  }

  return <TaskDetail task={taskData} />;
};

export default TaskDetailPage;
