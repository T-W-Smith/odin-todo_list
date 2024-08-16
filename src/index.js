import './style.css';

import Projects from './projects';
import Tasks from './tasks';
import Todos from './todos';

const todoList = new Todos();
const generalProject = new Projects("General");
todoList.setTodoList(generalProject);
const generalDiv = document.createElement('div');
generalDiv.textContent = (generalProject.getName());
document.getElementById("projectList").appendChild(generalDiv);

const task = function() {
    const taskBtn = document.getElementById("taskBtn");
    taskBtn.addEventListener('click', newTask);

    function newTask() {
        const newTask = new Tasks(prompt("task name"), "n/a", "n/a", "n/a", "n/a", "today");
        generalProject.setTasks(newTask);
        const taskDiv = document.createElement('div');
        taskDiv.textContent = (newTask.getName());
        document.getElementById("taskList").appendChild(taskDiv);
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