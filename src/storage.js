export function saveTodos (todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    // console.log(JSON.parse(localStorage.getItem('todoList')));
}

export function loadTodos() {
    return JSON.parse(localStorage.getItem('todoList'));
}

export function isLocalStorageAvailable() {
    if (JSON.parse(localStorage.getItem('todoList')) !== null)
        return true;
    else
        return false;
}

export function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}