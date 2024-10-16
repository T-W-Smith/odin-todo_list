import { deleteProject } from "./index";

export function taskDom(newTask, currentProject) {
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
        console.log("DELETE TASK");
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
    });
    swapProjects(newProject, currentProject);
    projectButton.addEventListener('click', function(e) {
        swapProjects(newProject, e.target.id.replace(/^\D+/g, ''));
    });
}

function swapProjects(newProject, currentProject) {
    document.getElementById("currentProject").textContent = newProject.getName();
    if(document.getElementById("taskList").childElementCount > 1) {
        let cDiv = document.getElementById('taskList').children;
        let cDiv2 = document.getElementById('projectList').children;
        for (let i = 0; i < cDiv.length; i++) {
            cDiv[i].style.display = 'none';
            document.getElementById(currentProject).style.display = '';
            cDiv2[i].style.backgroundColor = '';
            cDiv2[i].style.fontWeight = '';
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