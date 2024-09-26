export function saveTodos (todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    // console.log(JSON.parse(localStorage.getItem('todoList')));
}

export function saveProjects (project, currentProject) {
    localStorage.setItem('projects' + currentProject, JSON.stringify(project));
    // console.log(JSON.parse(localStorage.getItem('projects' + currentProject)));
}

export function saveTasks (tasks, project, taskNumber) {
    localStorage.setItem('tasks' + project + taskNumber, JSON.stringify(tasks));
    // console.log(JSON.parse(localStorage.getItem('tasks' + project + taskNumber)));
}