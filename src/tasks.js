export default class Tasks {
    constructor(name, description, priority, notes, dueDate, createtionDate, checked) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
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

    setPriority(priority) {
        this.priority = priority;
    }
    getPriority() {
        return this.priority;
    }

    setNotes(notes) {
        this.notes = notes;
    }
    getNotes() {
        return this.notes;
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