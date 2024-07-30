// src/app.ts
import { ScheduleManager } from './managers/ScheduleManager';
import { TaskConflictObserver, TaskCompletionObserver } from './observers/TaskObservers';

// Initialize ScheduleManager (Singleton)
const scheduleManager = ScheduleManager.getInstance();

// Add Observers
scheduleManager.addObserver(TaskConflictObserver);
scheduleManager.addObserver(TaskCompletionObserver);

// Command Line Interface
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\nAstronaut Daily Schedule Organizer");
    console.log("1. Add Task");
    console.log("2. Remove Task");
    console.log("3. View Tasks");
    console.log("4. Edit Task");
    console.log("5. Mark Task as Completed");
    console.log("6. View Tasks by Priority");
    console.log("7. Exit");
    console.log("Select an option (1-7):");
}

function prompt(question: string) {
    return new Promise<string>((resolve) => {
        readline.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}

async function main() {
    let exit = false;
    while (!exit) {
        showMenu();
        const choice = await prompt("");

        switch (choice) {
            case "1":
                const description = await prompt("Enter task description: ");
                const startTime = await prompt("Enter start time (HH:MM): ");
                const endTime = await prompt("Enter end time (HH:MM): ");
                const priority = await prompt("Enter priority level (High, Medium, Low): ");
                scheduleManager.addTask(description, startTime, endTime, priority);
                break;
            case "2":
                const removeDescription = await prompt("Enter task description to remove: ");
                scheduleManager.removeTask(removeDescription);
                break;
            case "3":
                scheduleManager.viewTasks();
                break;
            case "4":
                const oldDescription = await prompt("Enter task description to edit: ");
                const newDescription = await prompt("Enter new task description: ");
                const newStartTime = await prompt("Enter new start time (HH:MM): ");
                const newEndTime = await prompt("Enter new end time (HH:MM): ");
                const newPriority = await prompt("Enter new priority level (High, Medium, Low): ");
                scheduleManager.editTask(oldDescription, newDescription, newStartTime, newEndTime, newPriority);
                break;
            case "5":
                const completeDescription = await prompt("Enter task description to mark as completed: ");
                scheduleManager.markTaskAsCompleted(completeDescription);
                break;
            case "6":
                const priorityLevel = await prompt("Enter priority level to view tasks (High, Medium, Low): ");
                scheduleManager.viewTasksByPriority(priorityLevel);
                break;
            case "7":
                exit = true;
                break;
            default:
                console.log("Invalid option. Please select a valid option (1-7).");
                break;
        }
    }

    readline.close();
}

main().then(() => {
    console.log("Thank you for using the Astronaut Daily Schedule Organizer!");
});


// Usage Instructions
// Add Task:

// Enter the task description, start time, end time, and priority level. The application will check for conflicts and add the task if there are none.
// Remove Task:

// Enter the description of the task you wish to remove.
// View Tasks:

// The application will display a list of tasks sorted by start time.
// Edit Task:

// Enter the description of the task you wish to edit, followed by the new details.
// Mark Task as Completed:

// Enter the description of the task you wish to mark as completed.
// View Tasks by Priority:

// Enter the priority level to view tasks with that level of importance.
// Exit:

// Close the application.