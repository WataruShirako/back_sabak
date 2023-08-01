'use client';

import { format } from 'date-fns';
import { Avatar, AvatarGroup, Button } from '@mui/material';
import { PostWithTaskType } from '../types';
import Link from 'next/link';

const TaskItem = ({ task }: { task: PostWithTaskType }) => {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className={`space-y-3 w-full md:w-1/3 lg:h-56 border rounded-md p-4 hover:brightness-50 block max-w-xs`}
    >
      <p className="text-slate-400 text-xs">期限：{format(new Date(task.expired), 'yyyy/MM/dd')}</p>
      <p className="text-slate-400 font-semibold mt-2 text-xl">{task.title}</p>
      <p className="text-gray-900 text-xs">{task.content}</p>
      <div className="flex items-center justify-start mt-2">
        <AvatarGroup max={4} spacing={'small'}>
          <Avatar sx={{ width: 28, height: 28 }}>S</Avatar>
          <Avatar sx={{ width: 28, height: 28 }}>H</Avatar>
        </AvatarGroup>
      </div>
    </Link>
  );
};

export default TaskItem;
