import './style.css';

import Projects from './projects';
import Tasks from './tasks';
import Todos from './todos';
import {taskDom, projectDom, tempCurrentProject} from './ui';

let currentProject = 0;
const todoList = new Todos();

const generalProject = new Projects("General");
todoList.setTodoList(generalProject);
const generalDiv = document.createElement('button');
generalDiv.textContent = (generalProject.getName());
document.getElementById("currentProject").textContent = generalProject.getName();
document.getElementById("projectList").appendChild(generalDiv);
const projectDiv = document.createElement('div');
projectDiv.setAttribute('id', currentProject);
projectDiv.setAttribute('class', "projectDivContainer");
document.getElementById('taskList').appendChild(projectDiv);
generalDiv.addEventListener('click', function() {
    document.getElementById("currentProject").textContent = generalProject.getName();
    currentProject = todoList.getTodoList().findIndex(x => x.name === generalDiv.textContent);
    for (let i = 0; i < document.getElementById('taskList').childElementCount; i++) {
        document.getElementById(i).style.display = 'none';
        document.getElementById(currentProject).style.display = '';
    }
});

const task = function() {
    const taskBtn = document.getElementById("taskBtn");
    taskBtn.addEventListener('click', newTask);
    function newTask() {
        const newTask = new Tasks(prompt("task name"), prompt("description"), "n/a", false);
        if (newTask.getName() === ''){
            alert("Error: task name is empty");
            return;
        }
        todoList.getTodoList()[currentProject].setTasks(newTask);
        taskDom(newTask, currentProject);
    }
}();

const project = function() {
    const projectBtn = document.getElementById("projectBtn");
    projectBtn.addEventListener('click', newProject);
    function newProject() {
        const newProject = new Projects(prompt("Project name?"));
        if (newProject.getName() === ''){
            alert("Error: project name is empty");
            return;
        }
        todoList.setTodoList(newProject);
        currentProject = todoList.getTodoList().findIndex(x => x.name === newProject.getName());
        projectDom(newProject, currentProject);
        document.getElementById("projectsButton").addEventListener('click', function() {
            document.getElementById("currentProject").textContent = newProject.getName();
            currentProject = todoList.getTodoList().findIndex(x => x.name === newProject.getName());
            for (let i = 0; i < document.getElementById('taskList').childElementCount; i++) {
                document.getElementById(i).style.display = 'none';
                document.getElementById(currentProject).style.display = '';
            }
        });
    }
}();