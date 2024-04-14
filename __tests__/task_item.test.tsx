import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import TaskItem from '../src/components/task_item'

test('Task Item', () => {
  const task = {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    completed: false
  };
  render( /*#__PURE__*/React.createElement(TaskItem, {
    task: task
  }));
  expect(screen.getByText('Task 1')).toBeDefined();
})
