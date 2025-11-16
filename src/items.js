export class Note {
    constructor(title,description) {
        this.title = title;
        this.description = description; 
    };
};

export class Project {
    constructor(title,description,task) {
        this.title = title;
        this.description = description;
        this.task = [];
        this.id = `id-${crypto.randomUUID()}`;
        this.nextZ = 0;
    };
};

export class Task {
    constructor(title,priority) {
        this.title = title;
        this.priority = priority;
        this.id = `id-${crypto.randomUUID()}`
    };
};