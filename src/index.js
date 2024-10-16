import './style.css';

import Projects from './projects';
import Tasks from './tasks';
import Todos from './todos';
import {taskDom, projectDom, setUpGeneral} from './ui';
import {saveTodos, loadTodos, isLocalStorageAvailable, clearLocalStorage} from './storage';

let currentProject = 0;
let todoList = new Todos;
  
document.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
    // Execute code when the Enter key is pressed
    console.log(todoList.getTodoList());
    }
});

if (isLocalStorageAvailable()) {
    console.log("LOAD");
    const storedTodoList = loadTodos().todoList;
    for (let i = 0; i < storedTodoList.length; i++) {
        const newProject = new Projects(storedTodoList[i].name);
        currentProject = todoList.getTodoList().length;
        todoList.setTodoList(newProject);
        projectDom(newProject, i);
        if (i === 0)   
            setUpGeneral();
        updateCurrentProject(newProject);
        for (let j = 0; j < storedTodoList[i].tasks.length; j++) {
            const newTask = new Tasks(storedTodoList[i].tasks[j].name, storedTodoList[i].tasks[j].description, storedTodoList[i].tasks[j].dueDate, storedTodoList[i].tasks[j].checked);
            todoList.getTodoList()[i].setTasks(newTask);
            taskDom(newTask, i);
        }
    }
    document.getElementById("projectsButton" + 0).click();
}
else {
    console.log("NEW");
    initialSetUp();
}


function initialSetUp() {
    const generalProject = new Projects("General");
    todoList.setTodoList(generalProject);
    projectDom(generalProject, 0);
    setUpGeneral();
    updateCurrentProject(generalProject);

    saveTodos(todoList);
}

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
        saveTodos(todoList);
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
        currentProject = todoList.getTodoList().length - 1;
        projectDom(newProject, currentProject);
        updateCurrentProject(newProject);
        closeNewProject();

        saveTodos(todoList);
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

const resetTodoList = function () {
    document.getElementById("resetBtn").addEventListener('click', function() {
        clearLocalStorage();
    });
}();

export function deleteProject(projectName) {
    let projectIndex = todoList.getTodoList().findIndex(x => x.name === projectName);
    todoList.getTodoList().splice(projectIndex, 1);
    saveTodos(todoList);
    if (currentProject === projectIndex)
        document.getElementById("projectsButton" + 0).click();
}