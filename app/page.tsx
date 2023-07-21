import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import PostItem from '@/components/post/post-item';
import type { Database } from '@/lib/database.types';
import type { SubscriptionType } from '@/components/types';
import Link from 'next/link';
import {
  ArrowLeftOnRectangleIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  EnvelopeIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import ThemeButton from '@/components/ThemeButton';
import { usePathname } from 'next/navigation';

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
      <div className="fixed bottom-4 left-4 bg-gray-400 dark:bg-gray-900 p-5 rounded-lg z-50">
        {topNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className={` hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-sm`}>
              <item.icon className="inline-block w-5 h-5 mr-2" />
              {item.name}
            </div>
          </Link>
        ))}
        <ThemeButton />
      </div>
      <div className="col-1 max-w-screen-lg m-auto">
        {postData.map((post, index) => {
          // サブスクリプションの判定
          const isSubscriber =
            post.membership_id === null || session?.user.id === post.profile_id
              ? true
              : subscriptions!.some(
                  (item) =>
                    item.membership_id === post.membership_id &&
                    new Date(item.current_period_end!) >= new Date()
                );

          return <PostItem key={index} post={post} isSubscriber={isSubscriber} />;
        })}
      </div>
    </>
  );
};

export default Home;
