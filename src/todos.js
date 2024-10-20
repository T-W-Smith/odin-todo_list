// Todo class
export default class Todos {
    constructor() {
        this.todoList = [];
    }

    // Set and Get the todo list (Project array)
    setTodoList(todoList) {
        this.todoList.push(todoList);
    }
    getTodoList() {
        return this.todoList;
    }
}