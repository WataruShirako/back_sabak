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
  const { data: postData } = await supabase
    .from('posts')
    .select('*, profiles(name, avatar_url), memberships(title)')
    .order('created_at', { ascending: false });

  // 投稿がない場合
  if (!postData || postData.length === 0) {
    return <div className="text-center">投稿はありません</div>;
  }

  // サブスクリプションを取得
  let subscriptions: SubscriptionType[] | null = [];
  // ログインしていない場合は空配列
  if (session) {
    const { data: subscriptionData } = await supabase
      .from('subscriptions')
      .select('membership_id, current_period_end')
      .eq('profile_id', session.user.id);
    subscriptions = subscriptionData;
  }

  // ナビゲーション
  const topNavigation = [
    {
      name: '最近のタスク',
      icon: UserCircleIcon,
      href: '/settings/profile',
    },
    {
      name: '新規追加',
      icon: ComputerDesktopIcon,
      href: '/settings/email',
    },
  ];

  return (
    <>
      {/* {!session ? null : (
        <div className="fixed bottom-4 left-4 bg-green-800 p-2 rounded-lg z-50 shadow-sm">
          {topNavigation.map((item, index) => (
            <Link href={item.href} key={index}>
              <div
                className={`hover:bg-green-700 px-4 py-3 rounded-lg text-gray-100 font-semibold`}
              >
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      )} */}
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
            <TaskItem />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
