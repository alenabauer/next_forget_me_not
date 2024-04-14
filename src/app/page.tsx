'use client'

import TaskList from "../components/task_list";
import TaskInput from "../components/task_input";
import { useEffect, useState } from "react";
import { TaskApi } from "../api/task_api";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskApi = new TaskApi(process.env.API_URL);
        const fetchedTasks = await taskApi.getTasks();
        setTasks(fetchedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-24">
      <h1 className="text-xl font-bold text-center mb-4">
        Forget Me Not
      </h1>
      <TaskInput addTask={addTask}/>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </main>
  );
}
