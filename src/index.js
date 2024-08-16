import './style.css';

import Projects from './projects';
import Tasks from './tasks';
import Todos from './todos';

let currentProject = 0;

const todoList = new Todos();
const generalProject = new Projects("General");
todoList.setTodoList(generalProject);
const generalDiv = document.createElement('button');
generalDiv.textContent = (generalProject.getName());
document.getElementById("projectList").appendChild(generalDiv);
generalDiv.addEventListener('click', function() {
    document.getElementById("taskList").innerHTML = '';
    currentProject = todoList.getTodoList().findIndex(x => x.name === "General");
});

const task = function() {
    const taskBtn = document.getElementById("taskBtn");
    taskBtn.addEventListener('click', newTask);

    function newTask() {
        const newTask = new Tasks(prompt("task name"), "n/a", "n/a", "n/a", "n/a", "today");
        todoList.getTodoList()[currentProject].setTasks(newTask);
        const taskDiv = document.createElement('div');
        taskDiv.textContent = (newTask.getName());
        document.getElementById("taskList").appendChild(taskDiv);
    }
}();

const project = function() {
    const projectBtn = document.getElementById("projectBtn");
    projectBtn.addEventListener('click', newProject);

    function newProject() {
        const newProject = new Projects(prompt("project name"));
        todoList.setTodoList(newProject);
        const projectDiv = document.createElement('button');
        projectDiv.textContent = (newProject.getName());
        document.getElementById("projectList").appendChild(projectDiv);
        projectDiv.addEventListener('click', function() {
            document.getElementById("taskList").innerHTML = '';
            currentProject = todoList.getTodoList().findIndex(x => x.name === newProject.getName());
            for (let i = 0; i < newProject.getTasks().length; i++) {
                const taskDiv = document.createElement('div');
                taskDiv.textContent = (newProject.getTasks()[i].getName());
                document.getElementById("taskList").appendChild(taskDiv);
            }
        });
    }
}();

// const main = new Projects("main");
// const newTask = new Tasks("Make game", "We need to make a game", "rush", "n/a", "n/a", "today");

// let todoList = []

// todoList.push(main);
// main.setTasks(newTask);

// console.log(todoList);
// console.log(main);
// console.log(newTask);