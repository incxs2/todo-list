export class Note {
    constructor(title,description) {
        this.title = title;
        this.description = description;
        this.color = "#FFFFFF";
        this.id = crypto.randomUUID();
    };
};

export class Project {
    constructor(title,description,task) {
        this.title = title;
        this.description = description;
        this.task = [];
        this.id = crypto.randomUUID();
    };
};

