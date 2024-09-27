export default class Todos {
    constructor() {
        this.todoList = [];
        this.totalProjects;
    }

    setTodoList(todoList) {
        this.todoList.push(todoList);
    }
    getTodoList() {
        return this.todoList;
    }

    setTotalProjects(totalProjects) {
        this.totalProjects = totalProjects;
    }
    getTotalProjects() {
        return this.totalProjects;
    }
}