'use client';

import { format } from 'date-fns';
import TaskDetailPage from '@/app/tasks/[taskId]/page';
import { Avatar, AvatarGroup, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import MembershipItem from '../membership/membership-item';
import { PostWithTaskType } from '../types';
import Link from 'next/link';

const TaskItem = ({ task }: { task: PostWithTaskType }) => {
  const [todos, setTodos] = useState<any>([]);

  return (
    <Link
      href={`/tasks/${task.id}`}
      className={`space-y-3 w-64 h-64 border rounded-md p-4 hover:brightness-50`}
    >
      <p className="text-slate-400 text-xs">期限：{format(new Date(task.expired), 'yyyy/MM/dd')}</p>
      <p className="text-slate-400 font-semibold mt-2">{task.title}</p>
      <p className="text-slate-400 text-xs">{task.content}</p>
      <AvatarGroup max={4} spacing={'small'}>
        <Avatar sx={{ width: 28, height: 28 }}>H</Avatar>
        <Avatar sx={{ width: 28, height: 28 }}>H</Avatar>
      </AvatarGroup>
    </Link>
  );
};

export default TaskItem;
