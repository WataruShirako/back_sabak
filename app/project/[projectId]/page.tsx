import HeaderSecond from '@/app/components/header/header-second';
import { Sprout } from 'lucide-react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';
type PageProps = {
  params: {
    projectId: string;
  };
};

const ProjectDetailPage = async ({ params }: PageProps) => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 投稿を取得
  const { data: projectData } = await supabase.from('m_projects').select('*');

  // 投稿がない場合
  if (!projectData) {
    return <div className="text-center">投稿はありません</div>;
  }

  const sprout = <Sprout />;

  return (
    <>
      <div>プロジェクト詳細ページ</div>
    </>
  );
};

export default ProjectDetailPage;
