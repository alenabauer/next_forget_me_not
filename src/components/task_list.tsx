'use client'

import { useState, useEffect } from 'react';
import TaskItem from './task_item';
import { TaskApi } from '../api/task_api';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskApi = new TaskApi(process.env.API_URL);
        const fetchedTasks = await taskApi.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>Nothing to do!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}
