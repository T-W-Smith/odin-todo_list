export default class Tasks {
    constructor(name, description, dueDate, checked, index) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.checked = checked;
        this.index = index;
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

    setIndex(index) {
        this.index = index;
    }
    getIndex() {
        return this.index;
    }
}