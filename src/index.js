import './style.css';

import Projects from './projects';
import Tasks from './tasks';
import Todos from './todos';
import {taskDom, projectDom, setUpGeneral} from './ui';

let currentProject = 0;
const todoList = new Todos();

function setUp() {
    const generalProject = new Projects("General");
    todoList.setTodoList(generalProject);
    projectDom(generalProject, 0);
    setUpGeneral();
    updateCurrentProject(generalProject);
}

setUp();

const task = function() {
    const taskBtn = document.getElementById("taskBtn");
    taskBtn.addEventListener('click', function () {
       document.getElementById("taskDialog").showModal();
    });

    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = new Tasks(document.getElementById("taskName").value, document.getElementById("taskDesc").value, document.getElementById("taskDueDate").value, false);
        todoList.getTodoList()[currentProject].setTasks(newTask);
        taskDom(newTask, currentProject);
        closeNewTask();
    });

    document.getElementById('taskCancelBtn').addEventListener('click', function() {
        closeNewTask();
    });

    function closeNewTask() {
        document.getElementById("taskDialog").close();
        document.getElementById("taskName").value = "";
        document.getElementById("taskDesc").value = "";
        document.getElementById("taskDueDate").value = "";
    }
}();

const project = function() {
    let newProject;
    const projectBtn = document.getElementById("projectBtn");
    projectBtn.addEventListener('click', function () {
        document.getElementById("projectDialog").showModal();
    });

    document.getElementById('projectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        newProject = new Projects(document.getElementById("projectName").value);
        todoList.setTodoList(newProject);
        currentProject = todoList.getTodoList().findIndex(x => x.name === newProject.getName());
        projectDom(newProject, currentProject);
        updateCurrentProject(newProject);
        closeNewProject();
        document.getElementById('deleteProjectBtn' + currentProject).addEventListener('click', function() {
            console.log("DELETE");
        });
    });

    document.getElementById('projectCancelBtn').addEventListener('click', function() {
        closeNewProject();
    });

    function closeNewProject() {
        document.getElementById("projectDialog").close();
        document.getElementById("projectName").value = "";
    }

    document.getElementById('renameProjectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        newProject.setName(document.getElementById("renameProjectName").value);
        document.getElementById("projectsButton" + currentProject).textContent = newProject.getName();
        document.getElementById("currentProject").textContent = newProject.getName();
        document.getElementById("renameProjectDialog").close();
    });
    
    document.getElementById('renameProjectCancelBtn').addEventListener('click', function() {
        document.getElementById("renameProjectDialog").close();
    });
}();

function updateCurrentProject(project) {
    document.getElementById("projectsButton" + currentProject).addEventListener('click', function() {
        currentProject = todoList.getTodoList().findIndex(x => x.name === project.getName());
    });
}