"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleManager = void 0;
const TaskFactory_1 = require("../factories/TaskFactory");
const Logger_1 = require("../utils/Logger");
class ScheduleManager {
    constructor() {
        this.tasks = [];
        this.observers = [];
    }
    static getInstance() {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }
    addTask(description, startTime, endTime, priority) {
        const task = TaskFactory_1.TaskFactory.createTask(description, startTime, endTime, priority);
        if (task) {
            if (this.checkForConflicts(task)) {
                this.notifyObservers(task);
            }
            else {
                this.tasks.push(task);
                console.log('Task added successfully. No conflicts.');
                Logger_1.Logger.info(`Task added: ${task.toString()}`);
            }
        }
    }
    removeTask(description) {
        const index = this.tasks.findIndex((task) => task.description === description);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            console.log('Task removed successfully.');
            Logger_1.Logger.info(`Task removed: ${description}`);
        }
        else {
            console.log('Error: Task not found.');
        }
    }
    viewTasks() {
        if (this.tasks.length === 0) {
            console.log('No tasks scheduled for the day.');
        }
        else {
            this.tasks
                .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                .forEach((task) => console.log(task.toString()));
        }
    }
    editTask(oldDescription, newDescription, startTime, endTime, priority) {
        const index = this.tasks.findIndex((task) => task.description === oldDescription);
        if (index !== -1) {
            const newTask = TaskFactory_1.TaskFactory.createTask(newDescription, startTime, endTime, priority);
            if (newTask && !this.checkForConflicts(newTask, index)) {
                this.tasks[index] = newTask;
                console.log('Task edited successfully. No conflicts.');
                Logger_1.Logger.info(`Task edited: ${oldDescription} to ${newTask.toString()}`);
            }
            else {
                console.log('Error: Task conflicts with existing tasks.');
            }
        }
        else {
            console.log('Error: Task not found.');
        }
    }
    markTaskAsCompleted(description) {
        const task = this.tasks.find((task) => task.description === description);
        if (task) {
            task.completed = true;
            this.notifyCompletion(task);
            console.log(`Task "${description}" marked as completed.`);
            Logger_1.Logger.info(`Task completed: ${task.toString()}`);
        }
        else {
            console.log('Error: Task not found.');
        }
    }
    viewTasksByPriority(priority) {
        const filteredTasks = this.tasks.filter((task) => task.priority.toLowerCase() === priority.toLowerCase());
        if (filteredTasks.length === 0) {
            console.log(`No tasks found for priority level: ${priority}`);
        }
        else {
            filteredTasks.forEach((task) => console.log(task.toString()));
        }
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    checkForConflicts(newTask, currentIndex = -1) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (i !== currentIndex) {
                const task = this.tasks[i];
                if ((newTask.startTime >= task.startTime && newTask.startTime < task.endTime) ||
                    (newTask.endTime > task.startTime && newTask.endTime <= task.endTime)) {
                    return true;
                }
            }
        }
        return false;
    }
    notifyObservers(task) {
        this.observers.forEach((observer) => observer(task));
    }
    notifyCompletion(task) {
        const completionMessage = `Task "${task.description}" [${task.priority}] completed at ${new Date().toLocaleTimeString()}.`;
        console.log(completionMessage);
    }
}
exports.ScheduleManager = ScheduleManager;
