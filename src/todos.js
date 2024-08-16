export default class Todos {
    constructor() {
        this.todoList = [];
    }

    setTodoList(todoList) {
        this.todoList.push(todoList);
    }
    getTodoList() {
        return this.todoList;
    }
}