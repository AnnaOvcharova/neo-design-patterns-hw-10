import { AbstractCommand } from './AbstractCommand';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

export class UpdateTaskCommand extends AbstractCommand {
  private previousState?: Partial<Task>;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

  execute(): void {
    const currentTask = this.taskList
      .getAllTasks()
      .find((t) => t.id === this.taskId);

    if (currentTask) {
      const prevState: Partial<Task> = {};
      (Object.keys(this.updates) as (keyof Task)[]).forEach((key) => {
        (prevState as any)[key] = currentTask[key];
      });
      this.previousState = prevState;
    }

    this.taskList.updateTask(this.taskId, this.updates);
  }

  undo(): void {
    if (this.previousState) {
      this.taskList.updateTask(this.taskId, this.previousState);
    }
  }
}