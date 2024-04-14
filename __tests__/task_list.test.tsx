import { test, expect, describe, beforeEach, beforeAll, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../src/components/task_list';
import { TaskApi } from '../src/api/task_api';

describe('Task List Component', () => {
  let taskApi: TaskApi;

  beforeEach(() => {
    taskApi = new TaskApi();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    TaskApi.prototype.getTasks = vi.fn();
  });

  test('displays tasks', async () => {
    const tasks = [
      { id: '1', title: 'Task 1', description: 'Description 1', completed: false },
      { id: '2', title: 'Task 2', description: 'Description 2', completed: true }
    ]
    taskApi.getTasks.mockResolvedValueOnce(tasks);

    render(<TaskList tasks={tasks} />);

    await screen.findByText('Task 1');

    expect(screen.getByText('Task 1')).toBeDefined();
    expect(screen.getByText('Task 2')).toBeDefined();
  });

  test('displays "Nothing to do!" when no tasks', async () => {
    const tasks: Task[] = []
    taskApi.getTasks.mockResolvedValueOnce(tasks);

    render(<TaskList tasks={tasks} />);

    await screen.findByText('Nothing to do!');

    expect(screen.getByText('Nothing to do!')).toBeDefined();
  })
});
