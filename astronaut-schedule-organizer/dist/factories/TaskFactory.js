"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFactory = void 0;
// src/factories/TaskFactory.ts
const Task_1 = require("../models/Task");
class TaskFactory {
    static createTask(description, startTime, endTime, priority) {
        const start = TaskFactory.parseTime(startTime);
        const end = TaskFactory.parseTime(endTime);
        if (start && end && start < end) {
            return new Task_1.Task(description, start, end, priority);
        }
        else {
            console.log('Error: Invalid time format or end time is before start time.');
            return null;
        }
    }
    static parseTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        }
        else {
            return null;
        }
    }
}
exports.TaskFactory = TaskFactory;
