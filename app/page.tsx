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
    .eq('user_id', session?.user.id)
    .order('expired', { ascending: true });

  /// test.js
  const schedule = require('node-schedule');

  // const job = schedule.scheduleJob('10 * * * * *', function () {
  //   var date = new Date();
  //   // console.log('hh:mm:10に実行します' + date);
  // });

  // // 投稿の日付が3日を切ったら赤くする
  // const currentDate = new Date(); // 現在の日付を取得
  // // タスクの配列をマップして、それぞれのタスクに対して要素をレンダリング
  // if (taskData) {
  //   taskData.map((task) => {
  //     const taskDate = new Date(task.expired); // タスクの期限日付を取得

  //     // 期限と現在日付の差（ミリ秒）を計算し、それを日数に変換
  //     const diffDays = Math.ceil(
  //       (taskDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  //     );

  //     // 期限が3日以内であれば、'red'クラスを割り当て、そうでなければ''を割り当て
  //     const taskClass = diffDays <= 3 ? 'red' : '';

  //     // タスク要素をレンダリング。classNameにtaskClassを指定
  //     return;
  //   });
  // }

  return (
    <>
      <div className="max-w-screen-lg mx-auto flex mt-5 gap-2 flex-wrap">
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
