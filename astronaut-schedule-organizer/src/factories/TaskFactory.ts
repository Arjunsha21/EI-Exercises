// src/factories/TaskFactory.ts
import { Task } from '../models/Task';

export class TaskFactory {
  static createTask(
    description: string,
    startTime: string,
    endTime: string,
    priority: string
  ): Task | null {
    const start = TaskFactory.parseTime(startTime);
    const end = TaskFactory.parseTime(endTime);

    if (start && end && start < end) {
      return new Task(description, start, end, priority);
    } else {
      console.log('Error: Invalid time format or end time is before start time.');
      return null;
    }
  }

  private static parseTime(time: string): Date | null {
    const [hours, minutes] = time.split(':').map(Number);
    if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    } else {
      return null;
    }
  }
}
