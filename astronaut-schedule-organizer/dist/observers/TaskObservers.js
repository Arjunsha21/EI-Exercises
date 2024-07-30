"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskConflictObserver = TaskConflictObserver;
exports.TaskCompletionObserver = TaskCompletionObserver;
function TaskConflictObserver(task) {
    console.log(`Error: Task conflicts with existing task "${task.description}".`);
}
function TaskCompletionObserver(task) {
    console.log(`Observer: Task "${task.description}" has been completed.`);
}
