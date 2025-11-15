import "./styles/reset.css";
import "./styles.css";
import { Notes, Projects, renderProject, renderNote, closeModal, openModal } from "./render.js";
import { Note, Project } from "./items.js";

let mode = "notes";
document.querySelector("#notes").classList.add("active");

let buttonNew = document.querySelector("#new");
buttonNew.onclick = () => {openModal();console.log(mode)};

let buttonClose = document.querySelector(".closeButton");
buttonClose.onclick = () => closeModal();


function newNote(title,description) {
    let newNote = new Note(title, description, "#FFFFFF");
    renderNote(newNote);
    Notes.push(newNote)
};

function newProject(title,description) {
    let newProject = new Project(title,description);
    renderProject(newProject);
    Projects.push(newProject);
}


let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const title = data.get("title");
    const desc = data.get("desc");
    const prio = data.get("taskPriority");

    if (mode === "notes") {
        newNote(title,desc);
    } else if (mode === "projects") {
        newProject(title,desc);
    } else if (mode === "tasks") {
        newTask (title,desc,prio);
    }

    form.reset();
    closeModal();
});


let notesBtn = document.querySelector("#notes");
let projectBtn = document.querySelector("#projects");

notesBtn.onclick = () => {
    mode = "notes";
    projectBtn.classList.remove("active");
    document.querySelector(".content").innerHTML = "";
    /* load all notes */
    notesBtn.classList.add("active");
}

projectBtn.onclick = () => {
    mode = "projects";
    notesBtn.classList.remove("active");
    document.querySelector(".content").innerHTML = "";
    /* load all projects & tasks */
    projectBtn.classList.add("active");
}