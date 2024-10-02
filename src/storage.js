import {taskDom, projectDom, setUpGeneral} from './ui';

export function saveTodos (todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    // console.log(JSON.parse(localStorage.getItem('todoList')));
}

export function saveProjects (project, currentProject) {
    localStorage.setItem('projects' + currentProject, JSON.stringify(project));
    // console.log(JSON.parse(localStorage.getItem('projects' + currentProject)));
}

export function saveTasks (tasks, project, taskNumber) {
    localStorage.setItem('tasks' + project + taskNumber, JSON.stringify(tasks));
    // console.log(JSON.parse(localStorage.getItem('tasks' + project + taskNumber)));
}

export function isLocalStorageAvailable() {
    if (JSON.parse(localStorage.getItem('todoList')) !== null)
        return true;
    else
        return false;
}

export function loadTodos() {
    return JSON.parse(localStorage.getItem('todoList'));
}

export function loadProjects(todoList) {
    // let total = todoList.getTotalProjects();
    // for (let i = 0; i < todoList.getTodoList().length; i++) {
    //     projectDom(todoList.getTodoList()[i], i);
    // }
}

function loadTasks() {

}