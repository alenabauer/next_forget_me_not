export class TaskApi {
  private baseUrl: string | undefined;

  constructor(baseUrl: string = "http://localhost:3001") {
    this.baseUrl = baseUrl;
  }

  async getTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks`, { cache: "no-store" });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const tasks: Task[] = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(task: Task): Promise<Task> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const createdTask: Task = await response.json();
      return createdTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(task: Task): Promise<Task> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask: Task = await response.json();
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
