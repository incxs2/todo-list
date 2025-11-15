export let Notes = []
export let Projects = []

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

    let projDelete = document.createElement("div")
    projDelete.classList.add("delete")
    projDelete.textContent = "✖";
    projDelete.addEventListener("click", () => {
        Projects = Projects.filter(n => n.id !== project.id);
        projDiv.remove();
    });
    projDiv.appendChild(projDelete);

    let projTitle = document.createElement("h2");
    projTitle.classList.add("title");
    projTitle.textContent = project.title;
    let projDescription = document.createElement("p");
    projDescription.classList.add("description");
    projDescription.textContent = project.description;
    let container = document.querySelector(".content")
    projDiv.append(projTitle, projDescription)
    container.appendChild(projDiv);
}

export function closeModal() {
    document.querySelector(".modal").style.display = "none";
};

export function openModal() {
    document.querySelector(".modal").style.display = "flex";
};






/* add buttons to delete and maybe change colour here so it's on every new note. use absolute/relative positioning on
the css to make the buttons look nice */