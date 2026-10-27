import { TaskList } from '../models/TaskList';
import { CommandHistory } from '../commands/CommandHistory';
import { Task } from '../models/Task';
import { AddTaskCommand } from '../commands/AddTaskCommand';
import { RemoveTaskCommand } from '../commands/RemoveTaskCommand';
import { UpdateTaskCommand } from '../commands/UpdateTaskCommand';
import { CompleteTaskCommand } from '../commands/CompleteTaskCommand';

export class TaskManager {
  private taskList = new TaskList();
  private history = new CommandHistory();

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'completed'>): string {
    const newTask: Task = {
      id: this.generateId(),
      createdAt: new Date(),
      completed: false,
      ...task,
    };
    this.history.executeCommand(new AddTaskCommand(this.taskList, newTask));
    return newTask.id;
  }

  removeTask(id: string): void {
    this.history.executeCommand(new RemoveTaskCommand(this.taskList, id));
  }

  updateTask(id: string, updates: Partial<Task>): void {
    this.history.executeCommand(new UpdateTaskCommand(this.taskList, id, updates));
  }

  completeTask(id: string, completed: boolean = true): void {
    this.history.executeCommand(new CompleteTaskCommand(this.taskList, id, completed));
  }

  undo(): void {
    this.history.undo();
  }

  redo(): void {
    this.history.redo();
  }

  getTasks(): Task[] {
    return this.taskList.getAllTasks();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
