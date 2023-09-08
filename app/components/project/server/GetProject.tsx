import { getAllProjectAllColumns } from '@/app/utils/queries/project_queries';
import { Sprout } from 'lucide-react';
import Link from 'next/link';

export default async function GetProject({ pathname }: { pathname: any }) {
  const catsData = await getAllProjectAllColumns();

  // 投稿がない場合
  if (!catsData) {
    return <div>プロジェクトはありません</div>;
  }

  return (
    <>
      {catsData.map((item, index) => (
        <Link href={`/project/${item.project_id}`} key={index}>
          <div
            className={`${
              item.project_id == pathname && 'bg-gray-100 dark:bg-[#232323] text-gray-500'
            } hover:bg-gray-100 dark:hover:bg-[#232323] px-3 py-2 rounded-sm`}
          >
            <Sprout
              className={`${
                item.project_id == pathname && 'text-amber-300'
              } inline-block w-4 h-4 mr-2 text-gray-500`}
            />
            {item.project_name}
          </div>
        </Link>
      ))}
    </>
  );
}
