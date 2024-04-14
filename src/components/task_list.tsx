'use client'

import TaskItem from './task_item';

export default function TaskList(
  { tasks, deleteTask, updateTask }: {
    tasks: Task[],
    deleteTask: (id: string) => void,
    updateTask: (task: Task) => void
  }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>Nothing to do!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
