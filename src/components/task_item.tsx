'use client'

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li>
      { task.title }
    </li>
  );
}
