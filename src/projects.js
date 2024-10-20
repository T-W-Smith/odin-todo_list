// Project Class
export default class Projects {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    // Set and Get the name of the project
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    // Set and Get the task array of the project
    setTasks(tasks) {
        this.tasks.push(tasks);
    }
    getTasks() {
        return this.tasks;
    }
}