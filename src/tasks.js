export default class Tasks {
    constructor(name, description, dueDate, checked) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.checked = checked;
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    setDescription(description) {
        this.description = description;
    }
    getDescription() {
        return this.description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    getDueDate() {
        return this.dueDate;
    }

    setChecked(checked) {
        this.checked = checked;
    }
    getChecked() {
        return this.checked;
    }
}