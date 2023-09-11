import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { SubscriptionType } from '@/app/types/types';
import MemberDetail from '@/app/components/member/member-detail';
import type { Database } from '@/lib/database.types';

type PageProps = {
  params: {
    memberId: string;
  };
};

// メンバー詳細ページ(マイページ)
const ProjectDetailPage = async ({ params }: PageProps) => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // プロフィールを取得
  const { data: profileData } = await supabase.from('m_user').select('*');

  // プロフィールがない場合
  if (!profileData) {
    return <div className="text-center">プロフィールがありません</div>;
  }

  // メンバーシップを取得
  const { data: membershipData } = await supabase
    .from('t_memberships')
    .select('*')
    .eq('profile_id', params.memberId)
    .order('created_at', { ascending: false });

  // サブスクリプションを取得
  let subscriptions: SubscriptionType[] | null = [];
  // ログインしていない場合は空配列
  if (session) {
    const { data: subscriptionData } = await supabase
      .from('t_subscriptions')
      .select('t_membership_id, current_period_end')
      .eq('profile_id', session.user.id);
    subscriptions = subscriptionData;
  }

  return (
    <MemberDetail
      memberId={params.memberId}
      memberships={membershipData}
      // profile={profileData}
      subscriptions={subscriptions}
    />
  );
};

export default ProjectDetailPage;
