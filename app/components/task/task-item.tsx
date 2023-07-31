'use client';

import TaskDetailPage from '@/app/tasks/[taskId]/page';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import MembershipItem from '../membership/membership-item';
import { PostWithTaskType } from '../types';
import Link from 'next/link';

const TaskItem = ({ task }: { task: PostWithTaskType }) => {
  const [todos, setTodos] = useState<any>([]);

  return (
    <ul className="space-y-3">
      <li className="flex justify-between p-4 bg-white border-l-4">
        <span className="text-gray-900">{task.title}</span>
        <p className="text-gray-900">{task.content}</p>
        <div>
          <Link className="text-blue-900" href={`/tasks/${task.id}`}>
            Details
          </Link>
        </div>
      </li>
    </ul>
  );
};

export default TaskItem;
