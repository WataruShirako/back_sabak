'use client';

import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { PostWithTaskType } from '../../types/types';
import Link from 'next/link';
import { ja } from 'date-fns/locale';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

const TaskItem = ({ task }: { task: PostWithTaskType }) => {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className={`space-y-3 w-full md:w-1/3 lg:h-56 border rounded-md p-4 hover:brightness-50 block max-w-xs`}
    >
      <p className={'text-gray-300 text-xs'}>
        期限：{format(new Date(task.expired), 'yyyy/MM/dd HH:mm', { locale: ja })}
      </p>
      <p className={'text-gray-300 font-semibold mt-2 text-xl'}>{task.title}</p>
      <p className="text-gray-900 text-xs">{task.content}</p>
      <div className="flex items-center justify-start mt-2">
        <Avatar className={'w-8 h-8'}>
          <AvatarImage src={'/default.png'} className="rounded-full object-cover" alt="avatar" />
        </Avatar>
      </div>
    </Link>
  );
};

export default TaskItem;
