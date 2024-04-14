'use client'

import TaskList from "../components/task_list";
import TaskInput from "../components/task_input";
import { useEffect, useMemo, useState } from "react";
import { TaskApi } from "../api/task_api";

export default function Home() {
  const taskApi = useMemo(() => new TaskApi(process.env.API_URL), []);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskApi.getTasks();
        setTasks(fetchedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [taskApi]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = async (id: string) => {
    await taskApi.deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  }

  const updateTask = async (updatedTask: Task) => {
    await taskApi.updateTask(updatedTask);
    const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    setTasks(updatedTasks);
  }

  return (
    <main className="flex min-h-screen flex-col py-12 px-24">
      <h1 className="text-xl font-bold text-center mb-4">
        Forget Me Not
      </h1>
      <TaskInput addTask={addTask}/>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
        />
      )}
    </main>
  );
}
