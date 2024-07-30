// src/models/Task.ts
export class Task {
    constructor(
      public description: string,
      public startTime: Date,
      public endTime: Date,
      public priority: string,
      public completed: boolean = false
    ) {}
  
    toString(): string {
      return `${this.startTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })} - ${this.endTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}: ${this.description} [${this.priority}]`;
    }
  }
  