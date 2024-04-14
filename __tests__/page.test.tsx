import { describe, expect, test, vi, beforeAll, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'
import { TaskApi } from '../src/api/task_api'

describe('Page', () => {
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

  test('displays a heading', () => {
    taskApi.getTasks.mockReturnValueOnce([]);
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined()
  })
})
