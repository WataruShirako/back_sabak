'use client';

import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

const GanttChart = () => {
  let tasks: Task[] = [
    {
      start: new Date(2022, 9, 1),
      end: new Date(2022, 9, 10),
      name: 'ワイヤー作成',
      id: 'Task 0',
      type: 'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
  ];

  return <Gantt tasks={tasks} />;
};

export default GanttChart;
