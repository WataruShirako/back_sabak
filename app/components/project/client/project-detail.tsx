'use client';

import { ProjectType } from '@/app/types/project_database';
import Link from 'next/link';

// 投稿詳細
const ProjectDetail = ({
  project,
  isSubscriber,
}: {
  project: ProjectType;
  isSubscriber: boolean;
}) => {
  return (
    <div>
      <Link href={`/project/${project.project_id}`}>
        <div className="inline-flex items-center space-x-2 mb-5">
          <div className="relative w-10 h-10"></div>
          <div>
            <div className="font-bold">{project.project_name}</div>
          </div>
        </div>
      </Link>

      {isSubscriber ? (
        <div className="my-5 leading-relaxed break-words whitespace-pre-wrap">-------</div>
      ) : (
        <div className="my-5 text-center">メンバーシップ登録をお願いします</div>
      )}
    </div>
  );
};

export default ProjectDetail;
