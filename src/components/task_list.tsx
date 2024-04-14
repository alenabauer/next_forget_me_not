'use client'

import TaskItem from './task_item';

export default function TaskList({ tasks }: { tasks: Task[] }) {
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
