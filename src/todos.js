export default class Todos {
    constructor() {
        this.todoList = [];
    }

    setTodoList(todoList) {
        this.todoList = todoList;
    }
    getTodoList() {
        return this.todoList;
    }
}