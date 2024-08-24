export let tempCurrentProject;

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
    firstRowDiv.appendChild(checkBox);
    firstRowDiv.appendChild(taskName);
    taskDiv.appendChild(firstRowDiv);
    taskDiv.appendChild(taskDescription);
    document.getElementById(currentProject).appendChild(taskDiv);
}

export function projectDom(newProject, currentProject) {
    const projectButton = document.createElement('button');
    projectButton.textContent = newProject.getName();
    projectButton.setAttribute('id', "projectsButton");
    document.getElementById("projectList").appendChild(projectButton);
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute('id', currentProject);
    document.getElementById('taskList').appendChild(projectDiv);
}