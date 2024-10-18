import { deleteProject, deleteTask, save } from "./index";

export function taskDom(newTask, currentProject) {
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', "taskDivContainer");
    taskDiv.setAttribute('id', "taskDivContainer" + newTask.getIndex());
    const firstRowDiv = document.createElement('div');
    firstRowDiv.setAttribute('id', "firstRow");
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.setAttribute('id', "checkBox");
    checkBox.addEventListener('change', function() {
        newTask.setChecked(!newTask.getChecked());
        save();
    });
    checkBox.checked = newTask.getChecked();
    const taskName = document.createElement('button');
    taskName.setAttribute('id', "taskNameBtn");
    taskName.textContent = newTask.getName();
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
    const taskDescription = document.createElement('p');
    taskDescription.textContent = newTask.getDescription();
    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = "Due: " + newTask.getDueDate();
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.setAttribute('id', "deleteTaskBtn");
    deleteTaskBtn.textContent = "X";
    deleteTaskBtn.addEventListener('click', function() {
        taskDiv.remove();
        deleteTask(newTask.getIndex());
        let taskListChildren = document.getElementById(currentProject).children;
        for(let i = 0; i < taskListChildren.length; i++) {
            taskListChildren[i].setAttribute('id', "taskDivContainer" + i);
            document.getElementById("taskDivContainer" + i).querySelector('input[type=checkbox]').setAttribute('id', "checkBox" + i);
        }
    });
    firstRowDiv.appendChild(checkBox);
    firstRowDiv.appendChild(taskName);
    firstRowDiv.appendChild(deleteTaskBtn);
    taskDiv.appendChild(firstRowDiv);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(taskDueDate);
    document.getElementById(currentProject).appendChild(taskDiv);
    taskDescription.style.display = 'none';
    taskDueDate.style.display = 'none';
}

export function projectDom(newProject, currentProject) {
    const projectBtnDiv = document.createElement('div');
    projectBtnDiv.setAttribute('id', "projectBtnDiv" + currentProject);
    projectBtnDiv.setAttribute('class', "projectBtnDiv");
    const projectButton = document.createElement('button');
    projectButton.textContent = newProject.getName();
    projectButton.setAttribute('id', "projectsButton" + currentProject);
    projectButton.setAttribute('class', "projectsButton");

    if (projectButton.getAttribute('id') !== "projectsButton" + 0) {
        projectButton.addEventListener('dblclick', function() {
            document.getElementById("renameProjectDialog").showModal();
            document.getElementById("renameProjectName").value = newProject.getName();
        });
    }

    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = "X";
    deleteProjectBtn.setAttribute('id', "deleteProjectBtn" + currentProject);
    deleteProjectBtn.setAttribute('class', "deleteProjectBtn");
    projectBtnDiv.appendChild(projectButton);
    projectBtnDiv.appendChild(deleteProjectBtn);
    document.getElementById("projectList").appendChild(projectBtnDiv);
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute('id', currentProject);
    document.getElementById('taskList').appendChild(projectDiv);
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
    swapProjects(newProject, currentProject);
    projectButton.addEventListener('click', function(e) {
        swapProjects(newProject, e.target.id.replace(/^\D+/g, ''));
    });
}

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

export function setUpGeneral() {
    document.getElementById("projectBtnDiv" + 0).style.backgroundColor = '#707070';
    document.getElementById("projectBtnDiv" + 0).style.fontWeight = 'bold';
    document.getElementById("deleteProjectBtn" + 0).remove();
}