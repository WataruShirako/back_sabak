'use client';

import { format } from 'date-fns';
import { PostWithTaskType } from '@/app/components/types';
import Image from 'next/image';
import Link from 'next/link';

// 投稿詳細
const TaskDetail = ({ task }: { task: PostWithTaskType }) => {
  return (
    <div className="max-w-screen-md mx-auto mt-32">
      <div>
        <div className="inline-flex items-center space-x-2 mb-5">
          <div>
            <div className="text-sm text-gray-500">
              {format(new Date(task.inserted_at), 'yyyy/MM/dd HH:mm')}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 flex items-center space-x-1">
        <div className="font-bold text-lg">{task.title}</div>
        <div className="text-sm text-gray-500"></div>
      </div>

      <div className="my-5 leading-relaxed break-words whitespace-pre-wrap">{task.content}</div>
    </div>
  );
};

export default TaskDetail;
