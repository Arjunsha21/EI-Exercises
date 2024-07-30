"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
// src/models/Task.ts
class Task {
    constructor(description, startTime, endTime, priority, completed = false) {
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.priority = priority;
        this.completed = completed;
    }
    toString() {
        return `${this.startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })} - ${this.endTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })}: ${this.description} [${this.priority}]`;
    }
}
exports.Task = Task;
