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
    const taskName = document.createElement('p');
    taskName.textContent = newTask.getName();
    const taskDescription = document.createElement('p');
    taskDescription.textContent = newTask.getDescription();
    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = "Due: " + newTask.getDueDate();
    firstRowDiv.appendChild(checkBox);
    firstRowDiv.appendChild(taskName);
    taskDiv.appendChild(firstRowDiv);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(taskDueDate);
    document.getElementById(currentProject).appendChild(taskDiv);
}

export function projectDom(newProject, currentProject) {
    const projectButton = document.createElement('button');
    projectButton.textContent = newProject.getName();
    projectButton.setAttribute('id', "projectsButton" + currentProject);
    document.getElementById("projectList").appendChild(projectButton);
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute('id', currentProject);
    document.getElementById('taskList').appendChild(projectDiv);
    swapProjects(newProject, currentProject);
    projectButton.addEventListener('click', function() {
        swapProjects(newProject, currentProject);
    });
}

function swapProjects(newProject, currentProject) {
    document.getElementById("currentProject").textContent = newProject.getName();
    if(document.getElementById('taskList').childElementCount > 1) {
        for (let i = 0; i < document.getElementById('taskList').childElementCount; i++) {
            document.getElementById(i).style.display = 'none';
            document.getElementById(currentProject).style.display = '';
            document.getElementById("projectsButton" + i).style.border = '';
            document.getElementById("projectsButton" + currentProject).style.border = '2px solid black';
        }
    }
}