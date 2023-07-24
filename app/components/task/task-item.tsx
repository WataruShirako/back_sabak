'use client';

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const TaskItem = () => {
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   const getTodos = async () => {
  //     const todos = await getAllTodos();
  //     setTodos(todos);
  //     console.log(todos)
  //   };
  //   getTodos();
  // },[])

  return (
    <ul className="space-y-3">
      <li className="flex justify-between p-4 bg-white border-l-4">
        <span>散歩</span>
        <div>
          <Button variant="text" disableElevation className="">
            Edit
          </Button>
          <Button variant="text" disableElevation className="">
            Delete
          </Button>
        </div>
      </li>
    </ul>
  );
};

export default TaskItem;
