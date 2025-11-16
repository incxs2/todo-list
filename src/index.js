import "./styles/reset.css";
import "./styles.css";
import { Notes, Projects, renderProject, renderNote, renderTask, closeModal, openModal, taskMode, activeProject, setActiveProject, updateStorage } from "./render.js";
import { Note, Project, Task } from "./items.js";

renderNotes()

let mode = "notes";
document.querySelector("#notes").classList.add("active");

let buttonNew = document.querySelector("#new");
buttonNew.onclick = () => {openModal()};

let buttonClose = document.querySelector(".closeButton");
buttonClose.onclick = () => {
    closeModal();
    document.querySelector(".priority").classList.add("inactive");
    document.querySelector(".desc").classList.remove("inactive");
}


function newNote(title,description) {
    let newNote = new Note(title, description, "#FFFFFF");
    renderNote(newNote);
    Notes.push(newNote)
    updateStorage()
};

function newProject(title,description) {
    let newProject = new Project(title,description);
    renderProject(newProject);
    Projects.push(newProject);
    updateStorage()
}

function newTask(title,description,priority) {
    let newTask = new Task(title,priority);
    renderTask(newTask);
    activeProject.task.push(newTask);
    updateStorage()
}


let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const title = data.get("title");
    const desc = data.get("desc");
    const prio = data.get("taskPriority");

    if (activeProject != null) {
        newTask(title,desc,prio);
        console.log(activeProject.task)
        setActiveProject(null);
    } else if (mode === "notes") {
        newNote(title,desc);
    } else if (mode === "projects") {
        newProject(title,desc);
    }

    form.reset();
    closeModal();
    document.querySelector(".priority").classList.add("inactive");
    document.querySelector(".desc").classList.remove("inactive");
});


let notesBtn = document.querySelector("#notes");
let projectBtn = document.querySelector("#projects");

let contentDiv = document.querySelector(".content");

notesBtn.onclick = () => {
    mode = "notes";
    projectBtn.classList.remove("active");
    contentDiv.innerHTML = "";
    contentDiv.style.display = "block";
    contentDiv.style.padding = "16px";
    notesBtn.classList.add("active");
    renderNotes();
}

projectBtn.onclick = () => {
    mode = "projects";
    notesBtn.classList.remove("active");
    contentDiv.innerHTML = "";
    contentDiv.style.display = "flex";
    contentDiv.style.padding = "0 16px";
    projectBtn.classList.add("active");
    renderProjects();
}

function renderNotes() {
    if (Notes) {
        Notes.forEach(n => {
            renderNote(n);
        });
    }
};

function renderProjects() {
    if (Projects) {
        Projects.forEach(p => {
            renderProject(p);
            setActiveProject(p);
            p.task.forEach(t => {
                renderTask(t);
            });
        });
        setActiveProject(null);
    }
};