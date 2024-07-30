// src/observers/TaskObservers.ts
import { Task } from '../models/Task';

export function TaskConflictObserver(task: Task): void {
  console.log(`Error: Task conflicts with existing task "${task.description}".`);
}

export function TaskCompletionObserver(task: Task): void {
  console.log(`Observer: Task "${task.description}" has been completed.`);
}

