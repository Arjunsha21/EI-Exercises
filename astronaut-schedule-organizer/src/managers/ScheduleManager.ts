// src/managers/ScheduleManager.ts
import { Task } from '../models/Task';
import { TaskFactory } from '../factories/TaskFactory';
import { Logger } from '../utils/Logger';

export class ScheduleManager {
  private static instance: ScheduleManager;
  private tasks: Task[] = [];
  private observers: Array<(task: Task) => void> = [];

  private constructor() {}

  public static getInstance(): ScheduleManager {
    if (!ScheduleManager.instance) {
      ScheduleManager.instance = new ScheduleManager();
    }
    return ScheduleManager.instance;
  }

  public addTask(
    description: string,
    startTime: string,
    endTime: string,
    priority: string
  ): void {
    const task = TaskFactory.createTask(description, startTime, endTime, priority);
    if (task) {
      if (this.checkForConflicts(task)) {
        this.notifyObservers(task);
      } else {
        this.tasks.push(task);
        console.log('Task added successfully. No conflicts.');
        Logger.info(`Task added: ${task.toString()}`);
      }
    }
  }

  public removeTask(description: string): void {
    const index = this.tasks.findIndex(
      (task) => task.description === description
    );
    if (index !== -1) {
      this.tasks.splice(index, 1);
      console.log('Task removed successfully.');
      Logger.info(`Task removed: ${description}`);
    } else {
      console.log('Error: Task not found.');
    }
  }

  public viewTasks(): void {
    if (this.tasks.length === 0) {
      console.log('No tasks scheduled for the day.');
    } else {
      this.tasks
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .forEach((task) => console.log(task.toString()));
    }
  }

  public editTask(
    oldDescription: string,
    newDescription: string,
    startTime: string,
    endTime: string,
    priority: string
  ): void {
    const index = this.tasks.findIndex(
      (task) => task.description === oldDescription
    );
    if (index !== -1) {
      const newTask = TaskFactory.createTask(
        newDescription,
        startTime,
        endTime,
        priority
      );
      if (newTask && !this.checkForConflicts(newTask, index)) {
        this.tasks[index] = newTask;
        console.log('Task edited successfully. No conflicts.');
        Logger.info(`Task edited: ${oldDescription} to ${newTask.toString()}`);
      } else {
        console.log('Error: Task conflicts with existing tasks.');
      }
    } else {
      console.log('Error: Task not found.');
    }
  }

  public markTaskAsCompleted(description: string): void {
    const task = this.tasks.find((task) => task.description === description);
    if (task) {
      task.completed = true;
      this.notifyCompletion(task);
      console.log(`Task "${description}" marked as completed.`);
      Logger.info(`Task completed: ${task.toString()}`);
    } else {
      console.log('Error: Task not found.');
    }
  }

  public viewTasksByPriority(priority: string): void {
    const filteredTasks = this.tasks.filter(
      (task) => task.priority.toLowerCase() === priority.toLowerCase()
    );
    if (filteredTasks.length === 0) {
      console.log(`No tasks found for priority level: ${priority}`);
    } else {
      filteredTasks.forEach((task) => console.log(task.toString()));
    }
  }

  public addObserver(observer: (task: Task) => void): void {
    this.observers.push(observer);
  }

  private checkForConflicts(newTask: Task, currentIndex: number = -1): boolean {
    for (let i = 0; i < this.tasks.length; i++) {
      if (i !== currentIndex) {
        const task = this.tasks[i];
        if (
          (newTask.startTime >= task.startTime && newTask.startTime < task.endTime) ||
          (newTask.endTime > task.startTime && newTask.endTime <= task.endTime)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private notifyObservers(task: Task): void {
    this.observers.forEach((observer) => observer(task));
  }

  private notifyCompletion(task: Task): void {
    const completionMessage = `Task "${task.description}" [${task.priority}] completed at ${new Date().toLocaleTimeString()}.`;
    console.log(completionMessage);
  }
}
