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
const projectDiv = document.createElement('div');
projectDiv.setAttribute('id', currentProject);
document.getElementById('taskList').appendChild(projectDiv);
generalDiv.addEventListener('click', function() {
    currentProject = todoList.getTodoList().findIndex(x => x.name === generalDiv.textContent);
    for (let i = 0; i < document.getElementById('taskList').childElementCount; i++) {
        document.getElementById(i).style.display = 'none';
        document.getElementById(currentProject).style.display = '';
    }
    // document.getElementById("taskList").innerHTML = '';
    // currentProject = todoList.getTodoList().findIndex(x => x.name === "General");
    // for (let i = 0; i < generalProject.getTasks().length; i++) {
    //     const taskDiv = document.createElement('div');
    //     taskDiv.textContent = (generalProject.getTasks()[i].getName());
    //     const checkBox = document.createElement('input');
    //     checkBox.type = "checkbox";
    //     taskDiv.appendChild(checkBox);
    //     document.getElementById("taskList").appendChild(taskDiv);
    // }
});

const task = function() {
    const taskBtn = document.getElementById("taskBtn");
    taskBtn.addEventListener('click', newTask);

    function newTask() {
        const newTask = new Tasks(prompt("task name"), "n/a", "n/a", "n/a", "n/a", "today", false);
        todoList.getTodoList()[currentProject].setTasks(newTask);
        const taskDiv = document.createElement('div');
        taskDiv.textContent = (newTask.getName());
        const checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.addEventListener('change', function() {
            newTask.setChecked(!newTask.getChecked());
        });
        taskDiv.appendChild(checkBox);
        document.getElementById(currentProject).appendChild(taskDiv);
    }
}();

const project = function() {
    const projectBtn = document.getElementById("projectBtn");
    projectBtn.addEventListener('click', newProject);

    function newProject() {
        const newProject = new Projects(prompt("project name"));
        todoList.setTodoList(newProject);
        const projectButton = document.createElement('button');
        projectButton.textContent = (newProject.getName());
        document.getElementById("projectList").appendChild(projectButton);
        const projectDiv = document.createElement('div');
        currentProject = todoList.getTodoList().findIndex(x => x.name === newProject.getName());
        projectDiv.setAttribute('id', currentProject);
        document.getElementById('taskList').appendChild(projectDiv);
        projectButton.addEventListener('click', function() {
            currentProject = todoList.getTodoList().findIndex(x => x.name === projectButton.textContent);
            for (let i = 0; i < document.getElementById('taskList').childElementCount; i++) {
                document.getElementById(i).style.display = 'none';
                document.getElementById(currentProject).style.display = '';
            }
            // document.getElementById("taskList").innerHTML = '';
            // currentProject = todoList.getTodoList().findIndex(x => x.name === newProject.getName());
            // for (let i = 0; i < newProject.getTasks().length; i++) {
            //     const taskDiv = document.createElement('div');
            //     taskDiv.textContent = (newProject.getTasks()[i].getName());
            //     const checkBox = document.createElement('input');
            //     checkBox.type = "checkbox";
            //     taskDiv.appendChild(checkBox);
            //     document.getElementById("taskList").appendChild(taskDiv);
            // }
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