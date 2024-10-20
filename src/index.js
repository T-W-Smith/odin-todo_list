// Imports the style sheet
import './style.css';

// Imports from other modules
import Projects from './projects';
import Tasks from './tasks';
import Todos from './todos';
import {taskDom, projectDom, setUpGeneral} from './ui';
import {saveTodos, loadTodos, isLocalStorageAvailable, clearLocalStorage} from './storage';

// Current project selected index
let currentProject = 0;
// Newly created todolist
let todoList = new Todos;

// Checks to see if a local stoarge save file exists
if (isLocalStorageAvailable()) {
    // Loads the local storage save file
    // Temporary todo list
    const storedTodoList = loadTodos().todoList;
    // Loops through all projects in the loaded todo list
    // and displays them
    for (let i = 0; i < storedTodoList.length; i++) {
        const newProject = new Projects(storedTodoList[i].name);
        currentProject = todoList.getTodoList().length;
        todoList.setTodoList(newProject);
        projectDom(newProject, i);
        if (i === 0)   
            setUpGeneral();
        updateCurrentProject(newProject);
        // Loops through all the tasks in the loaded todo list/project list
        // and displays them
        for (let j = 0; j < storedTodoList[i].tasks.length; j++) {
            const newTask = new Tasks(storedTodoList[i].tasks[j].name, storedTodoList[i].tasks[j].description, storedTodoList[i].tasks[j].dueDate, storedTodoList[i].tasks[j].checked, j);
            todoList.getTodoList()[i].setTasks(newTask);
            taskDom(newTask, i);
        }
    }
    // Defaults to the general/main project being selected first
    document.getElementById("projectsButton" + 0).click();
}
else {
    // Sets up a new local storage save file
    initialSetUp();
}

// Function for creating a new todo list and local storage save file
function initialSetUp() {
    const generalProject = new Projects("General");
    todoList.setTodoList(generalProject);
    projectDom(generalProject, 0);
    setUpGeneral();
    updateCurrentProject(generalProject);

    saveTodos(todoList);
}

// Creates a new task for the respective project
const task = function() {
    // New task button event listener opens the task creation
    // modal dialog popup
    const taskBtn = document.getElementById("taskBtn");
    taskBtn.addEventListener('click', function () {
       document.getElementById("taskDialog").showModal();
    });

    // When the task modal dialog form is submitted, it creates
    // a new task based on the information inputed and saves it
    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // New task made from task module
        const newTask = new Tasks(document.getElementById("taskName").value, document.getElementById("taskDesc").value, document.getElementById("taskDueDate").value, false, document.getElementById(currentProject).childElementCount);
        todoList.getTodoList()[currentProject].setTasks(newTask);
        // Creates task from UI module
        taskDom(newTask, currentProject);
        // Closes the task modal dialog form popup
        closeNewTask();
        // Saves the todo list
        saveTodos(todoList);
    });

    // Event listener for canceling creating a new task
    document.getElementById('taskCancelBtn').addEventListener('click', function() {
        closeNewTask();
    });

    // Closes the modal dialog form popup for task creation
    function closeNewTask() {
        document.getElementById("taskDialog").close();
        document.getElementById("taskName").value = "";
        document.getElementById("taskDesc").value = "";
        document.getElementById("taskDueDate").value = "";
    }
}();

// Creates a new project
const project = function() {
    let newProject;
    // New project button event listener opens the project creation
    // modal dialog popup
    const projectBtn = document.getElementById("projectBtn");
    projectBtn.addEventListener('click', function () {
        document.getElementById("projectDialog").showModal();
    });

    // When the project modal dialog form is submitted, it creates
    // a new project based on the information inputed and saves it
    document.getElementById('projectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // New project made from task module
        newProject = new Projects(document.getElementById("projectName").value);
        todoList.setTodoList(newProject);
        currentProject = todoList.getTodoList().length - 1;
        // Creates project from UI module
        projectDom(newProject, currentProject);
        // Updates the current project index
        updateCurrentProject(newProject);
        // Closes the project modal dialog form popup
        closeNewProject();

        // Saves the todo list
        saveTodos(todoList);
    });

    // Event listener for canceling creating a new project
    document.getElementById('projectCancelBtn').addEventListener('click', function() {
        closeNewProject();
    });

    // Closes the modal dialog form popup for project creation
    function closeNewProject() {
        document.getElementById("projectDialog").close();
        document.getElementById("projectName").value = "";
    }

    // Rename project button event listener opens the rename project
    // modal dialog popup and saves it
    document.getElementById('renameProjectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        newProject.setName(document.getElementById("renameProjectName").value);
        document.getElementById("projectsButton" + currentProject).textContent = newProject.getName();
        document.getElementById("currentProject").textContent = newProject.getName();
        document.getElementById("renameProjectDialog").close();
        saveTodos(todoList);
    });
    
    // Event listener for canceling renaming a project
    document.getElementById('renameProjectCancelBtn').addEventListener('click', function() {
        document.getElementById("renameProjectDialog").close();
    });
}();

// Function for updating the current project index
function updateCurrentProject(project) {
    document.getElementById("projectsButton" + currentProject).addEventListener('click', function() {
        currentProject = todoList.getTodoList().findIndex(x => x.name === project.getName());
    });
}

// Event lisenter for reseting/deleting the local storage save file
const resetTodoList = function () {
    document.getElementById("resetBtn").addEventListener('click', function() {
        clearLocalStorage();
    });
}();

// Function for deleting projects and saves it
export function deleteProject(projectName) {
    // Gets the index of the project that is going to be deleted
    let projectIndex = todoList.getTodoList().findIndex(x => x.name === projectName);
    // Splice the project from the todo list array
    todoList.getTodoList().splice(projectIndex, 1);
    saveTodos(todoList);
    // If the currently selected project is the one being deleted
    // this will default select the general/main project
    if (currentProject === projectIndex)
        document.getElementById("projectsButton" + 0).click();
}

// Function for deleting tasks from projects and saves it
export function deleteTask(taskIndex) {
    // Splices the task from the project's task array based on the task's index
    todoList.getTodoList()[currentProject].getTasks().splice(taskIndex, 1);
    saveTodos(todoList);
}

// Function for saving the todo list
export function save() {
    saveTodos(todoList);
}