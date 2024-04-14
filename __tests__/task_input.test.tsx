import { test, expect, vi, beforeEach, afterEach, describe } from 'vitest';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import TaskInput from '../src/components/task_input';
import { TaskApi } from '../src/api/task_api';

// todo: mock the API call

describe('Task Input Component', () => {
  let addTaskMock: any;
  let taskApi: TaskApi;

  beforeEach(() => {
    taskApi = new TaskApi();
    addTaskMock = vi.fn();
    render(<TaskInput addTask={addTaskMock} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('submitting form creates task and calls addTask function', async () => {
    const titleInputElement = screen.getByTestId('title-input');
    const descriptionInputElement = screen.getByTestId('description-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(titleInputElement, { target: { value: 'Task Title' } });
    fireEvent.change(descriptionInputElement, { target: { value: 'Task Description' } });
    fireEvent(submitButton, new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }));

    await new Promise(resolve => setTimeout(resolve, 500));

    expect(addTaskMock).toHaveBeenCalledTimes(1);
    expect(addTaskMock).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.any(String),
      title: 'Task Title',
      description: 'Task Description',
      completed: false,
    }));
  });

  test('title input field updates correctly', () => {
    const titleInputElement = screen.getByTestId('title-input') as HTMLInputElement;

    fireEvent.change(titleInputElement, { target: { value: 'Task Title' } });

    expect(titleInputElement.value).toBe('Task Title');
  });

  test('description input field updates correctly', () => {
    const descriptionInputElement = screen.getByTestId('description-input') as HTMLInputElement;

    fireEvent.change(descriptionInputElement, { target: { value: 'Task Description' } });

    expect(descriptionInputElement.value).toBe('Task Description');
  });
});
