export default class Projects {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.tasksLength;
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    setTasks(tasks) {
        this.tasks.push(tasks);
    }
    getTasks() {
        return this.tasks;
    }

    setTasksLength(length) {
        this.tasksLength = length;
    }
    getTasksLength() {
        return this.tasksLength;
    }
}