export default function TaskItem({ task, onDelete, onUpdate }: { task: Task, onDelete: (id: string) => void, onUpdate: (task: Task) => void}) {
  return (
    <li className='flex justify-between items-center p-4 border-b gap-2'>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onUpdate({ ...task, completed: e.target.checked })}
        className='h-4 w-4'
      />
      <div className='flex-grow'>
        <h2>{task.title}</h2>
        <p className='text-xs'>{task.description}</p>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className='text-secondary p-2 hover:underline duration-200 text-white'
      >Delete</button>
    </li>
  );
}
