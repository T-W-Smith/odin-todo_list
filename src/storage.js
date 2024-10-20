// Saves the todo list to local storage
export function saveTodos (todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Loads the todo list from local storage
export function loadTodos() {
    return JSON.parse(localStorage.getItem('todoList'));
}

// Checks to see if a local storage save file exists
export function isLocalStorageAvailable() {
    if (JSON.parse(localStorage.getItem('todoList')) !== null)
        return true;
    else
        return false;
}

// Removes the local stoarge save file and reloads the page
export function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}