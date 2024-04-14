'use client'

import { v4 as uuidv4 } from 'uuid';
import React, { useState } from "react";
import { TaskApi } from "../api/task_api";

export default function TaskInput({addTask}: {addTask: (task: Task) => void}) {
  const [task, setTask] = useState<Task>({ id: uuidv4(), title: '', description: '', completed: false });
  const taskApi = new TaskApi(process.env.API_URL);

  const createTask = async () => {
    await taskApi.createTask(task);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createTask()
      .then(() => {
        addTask(task);
        setTask({ id: uuidv4(), title: '', description: '', completed: false });
      })
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <form onSubmit={handleSubmit} className='grid grid-cols-12 gap-2 p-2'>
      <input
        type="text"
        value={task.title}
        onChange={(event) => setTask({ ...task, title: event.target.value })}
        placeholder='Title'
        className='border-2 border-gray-300 p-2 text-black col-span-3'
        data-testid="title-input"
      />
      <input
        type="text"
        value={task.description}
        onChange={(event) => setTask({ ...task, description: event.target.value })}
        placeholder='Description...'
        className='border-2 border-gray-300 p-2 text-black col-span-6'
        data-testid="description-input"
      />
      <button
        type="submit"
        className='col-span-3 bg-primary-500 text-white hover:bg-primary-700 duration-200'
        data-testid="submit-button"
      >Add</button>
    </form>
  );
}
