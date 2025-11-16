let tryNotes = JSON.parse(localStorage.getItem("Notes"));
export let Notes = tryNotes === null ? [] : tryNotes;

let tryProjects = JSON.parse(localStorage.getItem("Projects"));
export let Projects = tryProjects === null ? [] : tryProjects;

export let taskMode = false;

export let activeProject = null;

export function setActiveProject(p) {
    activeProject = p;
}

export function renderNote(note) {
    let noteDiv = document.createElement("div");
    noteDiv.classList.add("note")
    noteDiv.style.backgroundColor = note.color;

    let noteDelete = document.createElement("div")
    noteDelete.classList.add("delete")
    noteDelete.textContent = "✖";
    noteDelete.addEventListener("click", () => {
        Notes = Notes.filter(n => n.id !== note.id);
        noteDiv.remove();
        updateStorage();
    });
    noteDiv.appendChild(noteDelete);


    let noteTitle = document.createElement("h2");
    noteTitle.classList.add("title")
    noteTitle.textContent = note.title;
    let noteDescription = document.createElement("p");
    noteDescription.classList.add("description")
    noteDescription.textContent = note.description;
    let container = document.querySelector(".content");
    noteDiv.append(noteTitle, noteDescription);
    container.appendChild(noteDiv);
};

export function renderProject(project) {
    let projDiv = document.createElement("div");
    projDiv.classList.add("project");
    projDiv.setAttribute("id", project.id)

    let projInfo = document.createElement("div");
    projInfo.classList.add("projInfo");

    let projDelete = document.createElement("div")
    projDelete.classList.add("delete")
    projDelete.textContent = "✖";
    projDelete.addEventListener("click", () => {
        Projects = Projects.filter(n => n.id !== project.id);
        projDiv.remove();
        updateStorage();
    });
    projDiv.appendChild(projDelete);

    let projTitle = document.createElement("h2");
    projTitle.classList.add("title");
    projTitle.textContent = project.title;
    let projDescription = document.createElement("p");
    projDescription.classList.add("description");
    projDescription.textContent = project.description;

    let projAddTask = document.createElement("div");
    projAddTask.classList.add("projAddTask");
    projAddTask.textContent = "+ Add Task"
    projAddTask.onclick = () => {
        setActiveProject(project);
        document.querySelector(".priority").classList.remove("inactive");
        document.querySelector(".desc").classList.add("inactive");
        openModal();
    }

    let projTasks = document.createElement("div");
    projTasks.classList.add("tasks");

    let container = document.querySelector(".content");
    projInfo.append(projTitle, projDescription);
    projDiv.appendChild(projInfo);
    projDiv.appendChild(projTasks)
    projDiv.appendChild(projAddTask);
    container.appendChild(projDiv);
}

export function renderTask(task) {
    let thisProject = activeProject;
    let currentProjTasks = document.querySelector(`#${thisProject.id}>.tasks`);
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task", task.priority);
    taskDiv.textContent = task.title;
    taskDiv.style.zIndex = thisProject.nextZ;
    thisProject.nextZ--;
    let deleteTask = document.createElement("div");
    deleteTask.textContent = "✖";
    deleteTask.classList.add("delete");
    deleteTask.onclick = () => {
        thisProject.task = thisProject.task.filter(n => n.id !== task.id)
        updateStorage();
        taskDiv.remove();
    }
    taskDiv.appendChild(deleteTask);
    currentProjTasks.appendChild(taskDiv);
}

export function closeModal() {
    document.querySelector(".modal").style.display = "none";
};

export function openModal() {
    document.querySelector(".modal").style.display = "flex";
};

export function updateStorage() {
    localStorage.setItem("Notes", JSON.stringify(Notes));
    localStorage.setItem("Projects",JSON.stringify(Projects));
}

