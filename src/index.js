import './style.css';

import Projects from './projects';
import Tasks from './tasks';
import Todos from './todos';
import {taskDom, projectDom} from './ui';

let currentProject = 0;
const todoList = new Todos();

function setUp() {
    const generalProject = new Projects("General");
    todoList.setTodoList(generalProject);
    projectDom(generalProject, 0); 
    updateCurrentProject(generalProject);
}

setUp();

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
        updateCurrentProject(newProject);
    }
}();

function updateCurrentProject(project) {
    document.getElementById("projectsButton" + currentProject).addEventListener('click', function() {
        currentProject = todoList.getTodoList().findIndex(x => x.name === project.getName());
    });
}