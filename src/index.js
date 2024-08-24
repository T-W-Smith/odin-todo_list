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
        const newTask = new Tasks(prompt("task name"), prompt("description"), "n/a", "today", false);
        if (newTask.getName() === ''){
            alert("Error: task name is empty");
            return;
        }
        todoList.getTodoList()[currentProject].setTasks(newTask);
        const taskDiv = document.createElement('div');
        taskDiv.setAttribute('class', "taskDivContainer");
        const firstRowDiv = document.createElement('div');
        firstRowDiv.setAttribute('id', "firstRow");
        const checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.addEventListener('change', function() {
            newTask.setChecked(!newTask.getChecked());
        });
        checkBox.setAttribute('id', "firstRow")
        const taskName = document.createElement('p');
        taskName.textContent = newTask.getName();
        const taskDescription = document.createElement('p');
        taskDescription.textContent = newTask.getDescription();
        firstRowDiv.appendChild(checkBox);
        firstRowDiv.appendChild(taskName);
        taskDiv.appendChild(firstRowDiv);
        taskDiv.appendChild(taskDescription);
        document.getElementById(currentProject).appendChild(taskDiv);
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
        const projectButton = document.createElement('button');
        projectButton.textContent = (newProject.getName());
        document.getElementById("projectList").appendChild(projectButton);
        const projectDiv = document.createElement('div');
        currentProject = todoList.getTodoList().findIndex(x => x.name === newProject.getName());
        projectDiv.setAttribute('id', currentProject);
        document.getElementById('taskList').appendChild(projectDiv);
        projectButton.addEventListener('click', function() {
            document.getElementById("currentProject").textContent = newProject.getName();
            currentProject = todoList.getTodoList().findIndex(x => x.name === projectButton.textContent);
            for (let i = 0; i < document.getElementById('taskList').childElementCount; i++) {
                document.getElementById(i).style.display = 'none';
                document.getElementById(currentProject).style.display = '';
            }
        });
    }
}();