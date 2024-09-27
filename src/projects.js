export default class Projects {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.totalTasks;
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

    setTotalTasks(totalTasks) {
        this.totalTasks = totalTasks;
    }
    getTotalTasks() {
        return this.totalTasks;
    }
}