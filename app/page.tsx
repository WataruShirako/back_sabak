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
  const { data: postData } = await supabase.from('todos').select('*');

  // 投稿がない場合
  if (!postData || postData.length === 0) {
    return <div className="text-center">投稿はありません</div>;
  }

  return (
    <>
      <div className="col-1 max-w-screen-lg m-auto">
        {!session ? (
          <Landing />
        ) : (
          // (
          //   postData.map((post, index) => {
          //     const isSubscriber =
          //       post.membership_id === null || session.user.id === post.profile_id
          //         ? true
          //         : subscriptions!.some(
          //             (item) =>
          //               item.membership_id === post.membership_id &&
          //               new Date(item.current_period_end!) >= new Date()
          //           );

          //     return (
          //       <>
          //         <PostItem key={index} post={post} isSubscriber={isSubscriber} />
          //       </>
          //     );
          //   })
          // )
          <>
            <TaskNew />
            {/* <TaskItem task={} /> */}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
