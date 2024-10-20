// Imports from the index module for deleting and saving
import { deleteProject, deleteTask, save } from "./index";

// Function handles all DOM releated aspects of creating a new task
export function taskDom(newTask, currentProject) {
    // The div that parents all task related elements
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', "taskDivContainer");
    taskDiv.setAttribute('id', "taskDivContainer" + newTask.getIndex());
    const firstRowDiv = document.createElement('div');
    firstRowDiv.setAttribute('id', "firstRow");
    // Checkbox/completion status box
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.setAttribute('id', "checkBox");
    // Changes the checkbox status and saves it
    checkBox.addEventListener('change', function() {
        newTask.setChecked(!newTask.getChecked());
        save();
    });
    checkBox.checked = newTask.getChecked();
    // Makes the entire task a button open it for more information
    const taskName = document.createElement('button');
    taskName.setAttribute('id', "taskNameBtn");
    taskName.textContent = newTask.getName();
    // Opens and closes the task for more information
    taskName.addEventListener('click', function() {
        if (taskDescription.style.display === 'none') {
            taskDescription.style.display = '';
            taskDueDate.style.display = '';
        }
        else {
            taskDescription.style.display = 'none';
            taskDueDate.style.display = 'none';
        }
    });
    // Task description
    const taskDescription = document.createElement('p');
    taskDescription.textContent = newTask.getDescription();
    // Task due date
    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = "Due: " + newTask.getDueDate();
    // The delete button for removal of the task
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.setAttribute('id', "deleteTaskBtn");
    deleteTaskBtn.textContent = "X";
    // Deletes the task and resets the index of all other tasks in the project
    deleteTaskBtn.addEventListener('click', function() {
        taskDiv.remove();
        deleteTask(newTask.getIndex());
        let taskListChildren = document.getElementById(currentProject).children;
        for(let i = 0; i < taskListChildren.length; i++) {
            taskListChildren[i].setAttribute('id', "taskDivContainer" + i);
            document.getElementById("taskDivContainer" + i).querySelector('input[type=checkbox]').setAttribute('id', "checkBox" + i);
        }
    });
    // Appends all task DOM
    firstRowDiv.appendChild(checkBox);
    firstRowDiv.appendChild(taskName);
    firstRowDiv.appendChild(deleteTaskBtn);
    taskDiv.appendChild(firstRowDiv);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(taskDueDate);
    // Appends the parent taskdiv to a main parent set by the project
    document.getElementById(currentProject).appendChild(taskDiv);
    taskDescription.style.display = 'none';
    taskDueDate.style.display = 'none';
}

// Function handles all DOM releated aspects of creating a new task
export function projectDom(newProject, currentProject) {
    // The div that parents all project related elements
    const projectBtnDiv = document.createElement('div');
    projectBtnDiv.setAttribute('id', "projectBtnDiv" + currentProject);
    projectBtnDiv.setAttribute('class', "projectBtnDiv");
    // Makes the project a button to allow for selection
    const projectButton = document.createElement('button');
    projectButton.textContent = newProject.getName();
    projectButton.setAttribute('id', "projectsButton" + currentProject);
    projectButton.setAttribute('class', "projectsButton");

    // Double clicking the project allows for renaming the project
    if (projectButton.getAttribute('id') !== "projectsButton" + 0) {
        projectButton.addEventListener('dblclick', function() {
            document.getElementById("renameProjectDialog").showModal();
            document.getElementById("renameProjectName").value = newProject.getName();
        });
    }

    // Button for deleting the project
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = "X";
    deleteProjectBtn.setAttribute('id', "deleteProjectBtn" + currentProject);
    deleteProjectBtn.setAttribute('class', "deleteProjectBtn");
    // Apprends everything to the parent div
    projectBtnDiv.appendChild(projectButton);
    projectBtnDiv.appendChild(deleteProjectBtn);
    document.getElementById("projectList").appendChild(projectBtnDiv);
    // Parent div that parents all the task DOM
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute('id', currentProject);
    document.getElementById('taskList').appendChild(projectDiv);
    // Deletes the project and resets the index of all other projects
    deleteProjectBtn.addEventListener('click', function() {
        projectBtnDiv.remove();
        projectDiv.remove();
        deleteProject(newProject.getName());
        let projectChildDivs = document.getElementById('projectList').children;
        let taskChildDivs = document.getElementById('taskList').children;
        for(let i = 1; i < projectChildDivs.length; i++) {
            taskChildDivs[i].setAttribute('id', i);
            projectChildDivs[i].setAttribute('id', "projectBtnDiv" + i);
            projectChildDivs[i].firstChild.setAttribute('id', "projectsButton" + i);
            projectChildDivs[i].lastChild.setAttribute('id', "deleteProjectBtn" + i);
        }
    });
    // Swaps the projects when clicking on a different one
    swapProjects(newProject, currentProject);
    projectButton.addEventListener('click', function(e) {
        swapProjects(newProject, e.target.id.replace(/^\D+/g, ''));
    });
}

// Function that swaps the projects by looping through all projects
// and displaying the one clicked and undisplaying the others
function swapProjects(newProject, currentProject) {
    document.getElementById("currentProject").textContent = newProject.getName();
    if(document.getElementById("taskList").childElementCount > 1) {
        let taskChildDivs = document.getElementById('taskList').children;
        let projectChildDivs = document.getElementById('projectList').children;
        for (let i = 0; i < taskChildDivs.length; i++) {
            taskChildDivs[i].style.display = 'none';
            document.getElementById(currentProject).style.display = '';
            projectChildDivs[i].style.backgroundColor = '';
            projectChildDivs[i].style.fontWeight = '';
            document.getElementById("projectBtnDiv" + currentProject).style.backgroundColor = '#707070';
            document.getElementById("projectBtnDiv" + currentProject).style.fontWeight = 'bold';
        }
    }
}

// Function that sets up the general/main project
export function setUpGeneral() {
    document.getElementById("projectBtnDiv" + 0).style.backgroundColor = '#707070';
    document.getElementById("projectBtnDiv" + 0).style.fontWeight = 'bold';
    document.getElementById("deleteProjectBtn" + 0).remove();
}