export default class Tasks {
    constructor(name, description, dueDate, createtionDate, checked) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.createtionDate = createtionDate;
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

    setCreationDate(createtionDate) {
        this.createtionDate = createtionDate;
    }
    getCreationDate() {
        return this.createtionDate;
    }

    setChecked(checked) {
        this.checked = checked;
    }
    getChecked() {
        return this.checked;
    }
}