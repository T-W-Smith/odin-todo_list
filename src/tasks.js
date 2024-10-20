// Task Class
export default class Tasks {
    constructor(name, description, dueDate, checked, index) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.checked = checked;
        this.index = index;
    }

    // Set and Get the name of the task
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    // Set and Get the description of the task
    setDescription(description) {
        this.description = description;
    }
    getDescription() {
        return this.description;
    }

    // Set and Get the due date of the task
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    getDueDate() {
        return this.dueDate;
    }

    // Set and Get the completion box(check box) of the task
    setChecked(checked) {
        this.checked = checked;
    }
    getChecked() {
        return this.checked;
    }

    // Set and Get the index of the task
    setIndex(index) {
        this.index = index;
    }
    getIndex() {
        return this.index;
    }
}