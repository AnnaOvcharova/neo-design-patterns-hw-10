import { AbstractCommand } from './AbstractCommand';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

export class RemoveTaskCommand extends AbstractCommand {
  private removedTask?: Task;

  constructor(
    private taskList: TaskList,
    private taskId: string
  ) {
    super();
  }

  execute(): void {
    this.removedTask = this.taskList.removeTask(this.taskId);
  }

  undo(): void {
    if (this.removedTask) {
      this.taskList.addTask(this.removedTask);
    }
  }
}
